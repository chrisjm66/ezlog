-- CreateTable
CREATE TABLE `aircraft` (
    `aircraft_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tail_number` VARCHAR(20) NOT NULL,
    `description` VARCHAR(500) NULL,
    `make` VARCHAR(50) NULL,
    `type_code` VARCHAR(5) NOT NULL,
    `model` VARCHAR(50) NULL,
    `engine_type` VARCHAR(20) NOT NULL,
    `number_of_engines` INTEGER NOT NULL,
    `taa` BOOLEAN NULL,
    `complex` BOOLEAN NULL,
    `high_performance` BOOLEAN NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `aircraft_users_user_id_fk`(`user_id`),
    PRIMARY KEY (`aircraft_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificates` (
    `certificate_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `expires` DATETIME(0) NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `ratings` VARCHAR(1000) NULL,
    `is_pillot_certificate` TINYINT NOT NULL DEFAULT 0,
    `is_instructor_certificate` TINYINT NOT NULL DEFAULT 0,
    `issued` DATETIME(0) NOT NULL,

    INDEX `certificates_users_user_id_fk`(`user_id`),
    PRIMARY KEY (`certificate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logbook_entries` (
    `logbook_entry_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `aircraft_id` INTEGER UNSIGNED NOT NULL,
    `total_time` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `pic` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `sic` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `solo` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `cross_country` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `sim_imc` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `actual_imc` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `night` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `day_landings` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `total_landings` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `night_landings` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `holding` BOOLEAN NOT NULL DEFAULT false,
    `intercepting` BOOLEAN NOT NULL DEFAULT false,
    `remarks` VARCHAR(500) NOT NULL DEFAULT '',
    `approaches` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `dual_given` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `dual_recieved` DECIMAL(4, 2) NOT NULL DEFAULT 0.00,
    `route` VARCHAR(300) NOT NULL,
    `ipc` BOOLEAN NOT NULL DEFAULT false,
    `checkride` BOOLEAN NOT NULL DEFAULT false,
    `flight_review` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `instructor_signature` BLOB NULL,
    `instructor_id` INTEGER UNSIGNED NULL,
    `date` DATE NOT NULL,
    `to` VARCHAR(4) NOT NULL DEFAULT '',
    `from` VARCHAR(4) NOT NULL,
    `approach_names` VARCHAR(300) NOT NULL DEFAULT '',

    INDEX `logbook_entries_aircraft_aircraft_id_fk`(`aircraft_id`),
    INDEX `logbook_entries_date`(`date`, `user_id`),
    INDEX `logbook_entries_instructors_instructor_id_fk`(`instructor_id`),
    INDEX `logbook_entries_users_user_id_fk`(`user_id`),
    PRIMARY KEY (`logbook_entry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `session_id` VARCHAR(255) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `expires` DATETIME(0) NOT NULL,

    INDEX `sessions_users_user_id_fk`(`user_id`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `isInstructor` BOOLEAN NOT NULL DEFAULT false,
    `instructorCid` INTEGER UNSIGNED NULL,
    `instructorExpiryDate` VARCHAR(15) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
