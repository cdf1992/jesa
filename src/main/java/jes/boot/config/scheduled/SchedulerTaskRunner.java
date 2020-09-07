package jes.boot.config.scheduled;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SchedulerTaskRunner {

	@Autowired
	private jes.subsystem.s.SchedulerTaskRunner schedulerTaskRunner;

	@Scheduled(cron = "0 0/1 * * * ?")
	public void runAll() {
		schedulerTaskRunner.runAll();
	}
}
