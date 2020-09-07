var ip = "127.0.0.1";
var fScan = false;
var fGet = false;
var gRecognize_type;
var gFulltext_type;
var gFileFormat;
var arrayRecognize = [];

function Connection(command, callback_func, str) {
    if (fScan == true) {
        alert("Resource Temporarily Unavailable...");
        return;
    }
    fScan = true;
    var obj = new Object();
    var socket;
    var PreviewObj = new PreviewImg();
    if (str == "") {
        str = command;
    }

	var result = {};
	str.split("&").forEach(function(part){
		var item = part.split("=");
		result[item[0]] = decodeURIComponent(item[1]);
	});
	gRecognize_type = result["recognize-type"];
	gFulltext_type = result["fulltext-type"];
    gFileFormat = result["imagefmt"];
    try {
        socket = new WebSocket("ws://" + ip + ":17777/" + str, "webfxscan");
        if (command == "GetPreview") {
            socket.binaryType = "arraybuffer";
        }
        obj.command = command;
    } catch (e) {
        obj.ret = -1;
        obj.data = command + " : WebSocket error";
        obj.status = 0;
        callback_func(obj);
        fScan = false;
        return;
    }
    socket.onclose = function (event) {
        socket.close();
        fScan = false;
        if ((event.code != "1000") && (event.code != "1005")) {
            obj.ret = -1;
            obj.data = "error:Cannot Connect to Server(" + event.code + ")";
            obj.status = 0;
            callback_func(obj);
        }

    };
    
    socket.onerror = function() {
    	
    	obj.ret = -1;
		obj.data = "error:Connection Errror";
		obj.status = 0;	
    	callback_func(obj);
    	delete socket;
    	fScan = false;
    };
    
    socket.onmessage = function (event) {
        switch (command) {
            case "GetDevicesList":
                //	delete socket;
                RecvDeviceList(obj, callback_func, event.data);
                fScan = false;
                break;

            case "GetImageList":
                RecvImageList(obj, callback_func, event.data);
                fScan = false;
                //delete socket;
                break;
            case "GetOCRData":
                RecvImageListAndOCR(obj, callback_func, event.data);
                fScan = false;
                break;
			case "GetImageDataAndDownload":
                RecvImageListAndData(obj, callback_func, event.data);
                fScan = false;
                break;
            case "GetPreview":
                if (event.data instanceof ArrayBuffer) {
                    var bytearray = new Uint8Array(event.data);
                    PreviewObj.CheckFormat(bytearray);
                    if (PreviewObj.format == "jpeg") {
                        PreviewObj.RecvPreviewImagejpeg(bytearray, obj, callback_func);
                    }
                    else {
                        // filename.pnm
                        PreviewObj.RecvPreviewImage(bytearray);
                        obj.data = PreviewObj;
                        obj.ret = 0;
                        callback_func(obj);
                    }
                    fScan = false;
                }
                else {
                    if (event.data != "finish") {
                        obj.data = event.data;
                        obj.ret = -1;
                        fScan = false;
                        callback_func(obj);
                    }

                }

                /*PreviewObj.RecvPreviewImage(event);
				obj.data = PreviewObj;
				obj.ret = 0;
				callback_func(obj);
				fScan = false;
			//	delete socket;
			*/
                break;

            case "RmFiles":
                RecvRmFilesResult(obj, callback_func, event.data);
                fScan = false;
                //delete socket;
                break;

            case "GetFileList":
                RecvFileList(obj, callback_func, event.data);
                fScan = false;
                break;

        }
    };
}

function ManualEjectConnection(str) {
    if (fScan == true) {
        alert("Resource Temporarily Unavailable...");
        return;
    }
    fScan = true;
    var socket;

    try {
        socket = new WebSocket("ws://" + ip + ":17777/" + str, "webfxscan");
    } catch (e) {
        fScan = false;
        return;
    }
    socket.onclose = function (event) {
        socket.close();
        fScan = false;
    };
    
    socket.onerror = function() {
    	delete socket;
    	fScan = false;
    };
    
    socket.onmessage = function (event) {

    };
}

function Connection_2(command, callback_func, str) {
    /*if (fGet == true) {
        alert("Resource Temporarily Unavailable...");
        return;
    }*/
    fGet = true;
    var obj = new Object();
    var socket;
    if (str == "") {
        str = command;
    }
    try {
        socket = new WebSocket("ws://" + ip + ":17776/" + str, "webfxscan");
        if (command == "GetFileData") {
            socket.binaryType = "arraybuffer";
        }
        obj.command = command;
    } catch (e) {
        obj.ret = -1;
        obj.data = command + " : WebSocket error";
        obj.status = 0;
        callback_func(obj);
        fGet = false;
        return;
    }
    socket.onclose = function (event) {
        socket.close();
        fGet = false;
        if ((event.code != "1000") && (event.code != "1005")) {
            obj.ret = -1;
            obj.data = "error:Cannot Connect to Server(" + event.code + ")";
            obj.status = 0;
            callback_func(obj);
        }
		else  {
			obj.ret = -1;
            obj.data = "finish";
            obj.status = 0;
            callback_func(obj);
		}
		

    };
    socket.onmessage = function (event) {
        switch (command) {
            case "GetFileData":
                obj.data = event.data;
                obj.ret = 0;
                fGet = false;
                //delete socket;
                callback_func(obj);
                break;
            case "GetRecognizeData":
                obj.data = event.data;
                obj.ret = 0;
                fGet = false;
                //delete socket;
                callback_func(obj);
                break;

        }
    };
	
	socket.onerror = function() {
    	
    	obj.ret = -1;
		obj.data = "error:Connection Errror";
		obj.status = 0;	
    	callback_func(obj);
    	delete socket;
    	fGet = false;
    };
}

function PaperDetectedConnection(command, callback_func, str) {
	
    var obj = new Object();
    var socket;
    if (str == "") {
        str = command;
    }
    try {
        socket = new WebSocket("ws://" + ip + ":17775/" + str, "webfxscan");
        obj.command = command;
    } catch (e) {
        obj.ret = -1;
        obj.data = command + " : WebSocket error";
        obj.status = 0;
        callback_func(obj);
        return;
    }
    socket.onclose = function (event) {
        socket.close();
        if ((event.code != "1000") && (event.code != "1005")) {
            obj.ret = -1;
            obj.data = "error:Cannot Connect to Server(" + event.code + ")";
            obj.status = 0;
            callback_func(obj);
        }

    };
    socket.onmessage = function (event) {
        switch (command) {
            case "DetectPaper":
                obj.data = event.data;
				if (obj.data.substring(0, 7) == "data:ok") {
					obj.ret = 0;
					obj.data = "";
				}
				else if (obj.data.substring(0, 19) == "data:paper detected") {
					obj.ret = 0;
					obj.data = event.data.substring(5, 19);
				}
                else {
					obj.ret = -1;
				}
                callback_func(obj);
                break;
        }
    };
	
	socket.onerror = function() {
    	obj.ret = -1;
		obj.data = "error:Connection Errror";
		obj.status = 0;	
    	callback_func(obj);
    	delete socket;
    };
}

function getImageFileStream(filename, thumbnail, del, callback_func) {
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }
    str = "GetFileData?filename=" + filename.trim() + "&thumbnail=" + thumbnail + "&delete=" + del;
    Connection_2("GetFileData", callback_func, str);
}

function RecvDeviceList(obj, func, data) {
    if (data.toString().substring(0, 10) == "error:None") {
        obj.ret = -1;
        obj.data = GetStr(language, "Scanner Not Found");
        obj.status = 0;
        func(obj);
    }
    else if (data.substring(0, 5) == "error:") {
        obj.ret = -1;
        obj.data = data;
        obj.status = 0;
        func(obj);
    }
    else {
        obj.ret = 0;
        obj.data = data;
        //alert("Get Device :" + obj.data);
        func(obj);
    }
}

function RecvImageList(obj, func, data) {
    if (data.toString().substring(0, 5) == "data:") // recv data
    {
        obj.ret = 0;
        obj.data = data.substring(5, data.length);
        func(obj);
    }
    else if (data.toString().substring(0, 7) == "status:") // scanning , recv status
    {
        var strData = data.split(",");
        obj.ret = 1;
        obj.status = strData[0];
        if (strData.length > 1) {
            //alert("obj.filename : " +strData[1]);
            obj.filename = strData[1];
        }
        else {
            delete obj.filename;
        }
        func(obj);
    }
    else if (data.toString().substring(0, 6) == "finish") // scan finish
    {
        //delete socket;
        fScan = false;
    }
    else //recv error
    {
        obj.ret = -1;
        obj.data = data;
        obj.status = 0;
        func(obj);

    }
}

function RecvImageListAndOCR(obj, func, data) {
    if (data.toString().substring(0, 5) == "data:") // recv data
    {
        obj.ret = 0;
        obj.data = data.substring(5, data.length);
        func(obj);
    }
    else if (data.toString().substring(0, 7) == "status:") // scanning , recv status
    {
        var strData = data.split(",");
        obj.ret = 1;
        obj.status = strData[0];
        if (strData.length > 1) {
            //alert("obj.filename : " +strData[1]);
            obj.filename = strData[1];
			
			var szOCRName = obj.filename;
				
			if (gFileFormat == "jpg")
				szOCRName = szOCRName.replace(".jpg", "");
			else if (gFileFormat == "bmp")
				szOCRName = szOCRName.replace(".bmp", "");
			else if (gFileFormat == "tif")
				szOCRName = szOCRName.replace(".tif", "");
			else if (gFileFormat == "pdf")
				szOCRName = szOCRName.replace(".pdf", "");
			else if (gFileFormat == "png")
				szOCRName = szOCRName.replace(".png", "");
            
			var str = "GetRecognizeData?filename=" + szOCRName + "&recognize-type=" + gRecognize_type + "&fulltext-type=" + gFulltext_type;
			arrayRecognize.push(str);
        }
        else {
            delete obj.filename;
        }
        func(obj);
    }
    else if (data.toString().substring(0, 6) == "finish") // scan finish
    {
        delete socket;
		for (idx = 0; idx < arrayRecognize.length; idx ++){ 
			Connection_2("GetRecognizeData", func, arrayRecognize[idx]);
			fGet = false;
		}
		arrayRecognize = [];
		fScan = false;
    }
    else //recv error
    {
        obj.ret = -1;
        obj.data = data;
        obj.status = 0;
        func(obj);

    }
}

function RecvImageListAndData(obj, func, data) {
    if (data.toString().substring(0, 5) == "data:") // recv data
    {
        obj.ret = 0;
        obj.data = data.substring(5, data.length);
        func(obj);
    }
    else if (data.toString().substring(0, 7) == "status:") // scanning , recv status
    {
        var strData = data.split(",");
        obj.ret = 1;
        obj.status = strData[0];
        if (strData.length > 1) {
            //alert("obj.filename : " +strData[1]);
            obj.filename = strData[1];
        }
        else {
            delete obj.filename;
        }
        func(obj);
    }
    else if (data.toString().substring(0, 6) == "finish") // scan finish
    {
        //delete socket;
        fScan = false;
    }
    else //recv error
    {
        obj.ret = -1;
        obj.data = data;
        obj.status = 0;
        func(obj);

    }
}

function RecvRmFilesResult(obj, func, data) {
    if (data.substring(0, 7) == "data:ok") {
        obj.ret = 0;
        obj.data = "";
    }
    else {
        obj.ret = -1;
        obj.data = data;
    }
    func(obj);
}

function RmFiles(func, filename) {
    var obj = new Object();
    if (filename == "") {
        obj.ret = -1;
        obj.data = "Bad parameter :  No path of target folder.";
        func(obj);
        return;
    }
    var str = "RmFiles?filename=" + filename;
    Connection("RmFiles", func, str);
}

function GetRecognizeData(func, filename, recognize_type, fulltext_type) {
    var obj = new Object();
    if (filename == "") {
        obj.ret = -1;
        obj.data = "Bad parameter :  No path of target folder.";
        func(obj);
        return;
    }
    var str = "GetRecognizeData?filename=" + filename + "&recognize-type=" + recognize_type + "&output-type=" + fulltext_type;
    Connection_2("GetRecognizeData", func, str);
    //Connection("GetRecognizeData",func,str);
}

function RecvFileList(obj, func, data) {

    if (data.toString().substring(0, 5) == "data:") {
        obj.ret = 0;
        var str = data.toString().substring(5, data.length).split(",");
        if (str[0] == 1) {
            obj.data = "";
            obj.data = str[1];
        }
        else {
            obj.data = obj.data + "," + str[1];
        }
    }

    else if (data.toString().substring(0, 6) == "finish") {
        obj.ret = 0;
        //obj.data = obj.data + data;
        func(obj);
    }
    else// if(data.substring(0,6) == "error:")
    {
        obj.ret = -1;
        obj.data = data;
        func(obj);
    }

}

function SetPaperDetectedListener(command, func, devicename, scansource) {

    var obj = new Object();
    if (devicename == "") {
        obj.ret = -1;
        obj.data = "Bad parameter :  Scanner Not Found";
        func(obj);
        return;
    }
    var szRequest = "SetParams?device-name=" + devicename + "&source=" + scansource + "&paper-detected=true";
    PaperDetectedConnection(command, func, szRequest);
}

//GetFileList
function GetFileList(func) {
    Connection("GetFileList", func, "GetFileList");
}
//-------------------------------------------------------------------
//Preview Object
//-------------------------------------------------------------------

PreviewImg = function () {
    this.format = "";

    var RecvImageNo = 0;
    var canvas_f = document.createElement("canvas");
    var canvas_b = document.createElement("canvas");
    var context_f = 0;
    var context_b = 0;


    var img_f = document.createElement("img");
    img_f.id = "image_view";
    var img_b = document.createElement("img");
    img_b.id = "image_view";
    var PreviewImgObj = this;
    bin2txt = function (buffer) {
        return String.fromCharCode.apply(null, buffer);
    };
    this.CheckFormat = function (bytearray) {
        //var bytearray = new Uint8Array(event.data);
        if (bin2txt(bytearray.subarray(0, 2)) == "P4") {
            this.format = "P4";
        }
        else if (bin2txt(bytearray.subarray(0, 2)) == "P5") {
            this.format = "P5";
        }
        else if (bin2txt(bytearray.subarray(0, 2)) == "P6") {
            this.format = "P6";
        }
        else {
            this.format = "jpeg";
        }
    };
    this.RecvPreviewImage = function (bytearray) {
        //if(event.data instanceof ArrayBuffer)
        //{
        //var bytearray = new Uint8Array(event.data);
        /*if(bin2txt(bytearray.subarray(0,2)) == "P4")
        {
            
            HeaderLine = 3;
            this.format = "pnm";
        }
        else if((bin2txt(bytearray.subarray(0,2)) == "P5") || (bin2txt(bytearray.subarray(0,2)) == "P6"))
        {
            HeaderLine = 4;
            this.format = "pnm";
        }
        else
        {
            this.format = "jpeg";
            //alert("RecvPreviewImagejpeg");
            RecvPreviewImagejpeg(bytearray);
            return;
            
        }
        */
        if (this.format == "P4") {
            HeaderLine = 3;
        }
        else {
            HeaderLine = 4;
        }

        var count = 0, i = 0;
        for (i = 0 ; i < bytearray.length; i++) //parser header
        {
            if (bytearray[i] == "10") // 0a 
            {
                count++;
                if (count == HeaderLine) {
                    break;
                }
            }
        }

        var strdata = bin2txt(bytearray.subarray(0, i)); //get header , to string
        var start = i + 1; //pixel data 
        var str = strdata.split('\n');

        var type = str[0];
        if (type != "P4") {
            var a_value = parseInt(str[3]);
        }
        value = str[2].split(" ");

        var imgdata = 0;
        var imgdatalen = 0;

        if (RecvImageNo == 0) //front
        {
            canvas_f.height = parseFloat(value[1]);
            canvas_f.width = parseFloat(value[0]);
            context_f = canvas_f.getContext('2d');
            imgdata = context_f.getImageData(0, 0, canvas_f.width, canvas_f.height);
            imgdatalen = imgdata.data.length;
        }
        else if (RecvImageNo == 1) {
            canvas_b.height = parseFloat(value[1]);
            canvas_b.width = parseFloat(value[0]);
            context_b = canvas_b.getContext('2d');
            imgdata = context_b.getImageData(0, 0, canvas_b.width, canvas_b.height);
            imgdatalen = imgdata.data.length;
        }
        switch (type) {
            case "P6":
                for (var j = 0; j < imgdatalen; j++) {
                    if ((j % 4) == 3) {
                        imgdata.data[j] = a_value;
                    }
                    else {
                        imgdata.data[j] = bytearray[start++];
                    }
                }
                break;
            case "P5":
                for (var j = 0; j < imgdatalen; j = j + 4) {
                    imgdata.data[j] = bytearray[start];
                    imgdata.data[j + 1] = bytearray[start];
                    imgdata.data[j + 2] = bytearray[start++];
                    imgdata.data[j + 3] = a_value;
                }
                break;
            case "P4":
                var shift = 0x80;
                var pixel = 0;
                for (var j = 0; j < imgdatalen; j = j + 4) {
                    if (shift == 0) {
                        shift = 0x80;
                        start++;
                    }
                    pixel = bytearray[start] & shift;
                    if (pixel != 0) {
                        pixel = 0;
                    }
                    else {
                        pixel = 255;
                    }
                    imgdata.data[j] = pixel;
                    imgdata.data[j + 1] = pixel;
                    imgdata.data[j + 2] = pixel;
                    imgdata.data[j + 3] = 255;
                    shift = shift >> 1;
                }
                break;
        }

        if (RecvImageNo == 0) //front
        {
            context_f.putImageData(imgdata, 0, 0);
            RecvImageNo = 1;
        }
        else if (RecvImageNo == 1)  //Back
        {
            context_b.putImageData(imgdata, 0, 0);
            RecvImageNo = 0;
        }
        //}
        //else
        //{
        //	if(event.data != "finish")
        //	{
        //alert("[Data ERROR]" + event.data);
        //	}
        //}
    };
	
    this.ShowPreviewImage = function (id, ImageNo) {
        var div = document.getElementById(id);
        if (document.getElementById("canvas_view")) {
            document.getElementById("canvas_view").parentNode.removeChild(document.getElementById("canvas_view"));
        }
        var chatdiv = document.createElement("canvas");
        chatdiv.id = "canvas_view";
        var scale = 1;

        var windowheight = parseFloat(window.getComputedStyle(document.getElementById("view")).height);
        var windowwidth = parseFloat(window.getComputedStyle(document.getElementById("view")).width);

        if (ImageNo == 0) //front
        {
            imageheight = canvas_f.height;
            imagewidth = canvas_f.width;
        }
        else if (ImageNo == 1) {
            imageheight = canvas_b.height;
            imagewidth = canvas_b.width;
        }

        if (imageheight > windowheight) {
            scale = windowheight / imageheight;
        }
        if ((imagewidth * scale) > windowwidth) {
            scale = windowwidth / imagewidth;
        }


        chatdiv.height = imageheight * scale;
        chatdiv.width = imagewidth * scale;

        var context = chatdiv.getContext('2d');
        context.scale(scale, scale);

        if (ImageNo == 0) //front
        {
            context.drawImage(canvas_f, 0, 0);

        }
        else if (ImageNo == 1) {
            context.drawImage(canvas_b, 0, 0);
        }
        div.appendChild(chatdiv);
    };

    this.RecvPreviewImagejpeg = function (bytes, obj, callback_func) {
        if (RecvImageNo == 0) //front
        {
            RecvImageNo = 1;
            img_f.src = 'data:image/jpeg;base64,' + encode(bytes);
            img_f.onload = function () {
                obj.data = PreviewImgObj;
                obj.ret = 0;
                callback_func(obj);
            };
            img_f.onerror = function (stuff) {
                alert("Recv Preview Image error:", stuff);
            };
        }
        else if (RecvImageNo == 1)  //Back
        {
            RecvImageNo = 0;
            img_b.src = 'data:image/jpeg;base64,' + encode(bytes);
            img_b.onload = function () {
                obj.data = PreviewImgObj;
                obj.ret = 0;
                callback_func(obj);
            };
            img_f.onerror = function (stuff) {
                alert("Recv Preview Image error:", stuff);
            };
        }
    };

    this.ShowPreviewImagejpeg = function (id, ImageNo) {
        var div = document.getElementById(id);

        var windowheight = parseFloat(window.getComputedStyle(document.getElementById("view")).height);
        var windowwidth = parseFloat(window.getComputedStyle(document.getElementById("view")).width);
        if (document.getElementById("image_view")) {
            document.getElementById("image_view").parentNode.removeChild(document.getElementById("image_view"));
        }
        scale = 1;
        if (ImageNo == 0) //front
        {
            if (img_f.height > windowheight) {
                var scale = windowheight / img_f.height;
            }
            if ((img_f.width * scale) > windowwidth) {
                var scale = windowwidth / img_f.width;
            }
            img_f.style.height = parseInt(img_f.height * scale) + "px";
            div.appendChild(img_f);
        }
        else if (ImageNo == 1) {

            if (img_b.height > windowheight) {
                var scale = windowheight / img_b.height;
            }
            if ((img_b.width * scale) > windowwidth) {
                var scale = windowwidth / img_b.width;
            }
            img_b.style.height = parseInt(img_b.height * scale) + "px";
            div.appendChild(img_b);
        }

    };

    encode = function (input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
            chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
               keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    };
};
//-------------------------------------------------------------------
// Read Config
//-------------------------------------------------------------------
/*
IniConfig = function(iniFileName)
{
	this.iniFileName = iniFileName;
	iniSecDictionary = new Array();
	this.load = function()
	{
		var File = new XMLHttpRequest();
		File.open("GET", this.iniFileName, false);
		File.onreadystatechange = function ()
	    {
	        if(File.readyState === 4)
	        {
	            if(File.status === 200 || File.status == 0)
	            {
	                this.allText = File.responseText;
	                ParserData(File.responseText);
	               
	            }
	        }
	    };
		File.send();
	};
	this.get = function(secName, keyName)
	{
		var dic = iniSecDictionary;
		try
		{
			return dic[secName][keyName];
		}
		catch (e)
		{
			return '';
		}
	};
}

function ParserData(data)
{
	//alert(data);
	var currSecName = null;
 	var arraybuf = data.split("\r\n");
 	
 	for(var i = 0 ; i < arraybuf.length ; i++)
 	{
 		var strLine = arraybuf[i];
 		if (strLine.length > 0)
 		{
 			var firchCh = strLine.substr(0, 1);
 			if (firchCh != ';')
 			{
 				if (firchCh == '[')
 				{
 					var secName = strLine.substr(1, strLine.length - 2);
 					currSecName = secName;
 					iniSecDictionary[secName] = new Array();
 				}
 				else
 				{
 					var idx = strLine.indexOf('=');
 					var strKey = strLine.substring(0, idx);
 					var strVal = strLine.substr(idx + 1);
 					if (currSecName == null)
 					{
 						throw ("Ini file format is incorrect.");
 					}
 					iniSecDictionary[currSecName][strKey] = strVal;
 				}
 			}
 		}
 	}
}
*/
