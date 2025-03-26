-- AddForeignKey
ALTER TABLE `logbook_entries` ADD CONSTRAINT `logbook_entries_aircraft_id_fkey` FOREIGN KEY (`aircraft_id`) REFERENCES `aircraft`(`aircraft_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logbook_entries` ADD CONSTRAINT `logbook_entries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logbook_entries` ADD CONSTRAINT `logbook_entries_instructor_user_id_fkey` FOREIGN KEY (`instructor_user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
