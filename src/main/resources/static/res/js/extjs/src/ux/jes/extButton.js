Ext.define('Ext.ux.jes.extButton', {
	extend:'Ext.button.Button',
    alias: 'widget.extbutton',
    	
    /**
     * Sets a new menu for this button. Pass a falsy value to unset the current menu.
     * To destroy the previous menu for this button, explicitly pass `false` as the second argument. If this is not set, the destroy will depend on the
     * value of {@link #cfg-destroyMenu}.
     *
     * @param {Ext.menu.Menu/String/Object/null} menu Accepts a menu component, a menu id or a menu config.
     * @param {Boolean} destroyMenu By default, will destroy the previous set menu and remove it from the menu manager. Pass `false` to prevent the destroy.
     */
    setMenu: function (menu, destroyMenu) {
        var me = this,
            oldMenu = me.menu;

        if (oldMenu && destroyMenu !== false && me.destroyMenu) {
            oldMenu.destroy();
        }

        if (oldMenu) {
            oldMenu.ownerCmp = oldMenu.ownerButton = null;
        }

        if (menu) {
            // Retrieve menu by id or instantiate instance if needed.
            menu = Ext.menu.Manager.get(menu);

            // Use ownerCmp as the upward link. Menus *must have no ownerCt* - they are global floaters.
            // Upward navigation is done using the up() method.
            menu.ownerCmp = menu.ownerButton = me;

            me.mon(menu, {
                scope: me,
                show: me.onMenuShow,
                hide: me.onMenuHide
            });

            // If the button wasn't initially configured with a menu or has previously been unset then we need
            // to poke the split classes onto the btnWrap dom element.
            if (!oldMenu) {
                me.split = true;
                if (me.rendered) {
                    me.btnWrap.addCls(me.getSplitCls());
                    me.updateLayout();
                }
            }

            me.menu = menu;
        } else {
            if (me.rendered) {
                me.btnWrap.removeCls(me.getSplitCls());
                me.updateLayout();
            }
            me.split = false;
            me.menu = null;
        }
    }
})