-- AddForeignKey
ALTER TABLE `aircraft` ADD CONSTRAINT `aircraft_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
