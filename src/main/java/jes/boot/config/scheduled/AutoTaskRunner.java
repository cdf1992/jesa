package jes.boot.config.scheduled;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AutoTaskRunner {

	@Autowired
	private jes.subsystem.s.AutoTaskRunner autoTaskRunner;

	@Scheduled(cron = "0 5 0 * * ?")
	public void runEachDayScheduling() {
		autoTaskRunner.runEachDay();
	}

	@Scheduled(cron = "0 0/10 * * * ?")
	public void runEach10MinsScheduling() {
		autoTaskRunner.runEach10Mins();
	}
}
