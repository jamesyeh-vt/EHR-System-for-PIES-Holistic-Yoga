-- V1__init_bigint.sql
-- Initial schema – IDs are BIGINT to align with Java Long

/* 1. patients */
CREATE TABLE patients (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          first_name            VARCHAR(50)  NOT NULL,
                          last_name             VARCHAR(50)  NOT NULL,
                          date_of_birth         DATE,
                          address               VARCHAR(255),
                          city                  VARCHAR(100),
                          state                 VARCHAR(50),
                          zip_code              VARCHAR(20),
                          email                 VARCHAR(150),
                          home_phone_number     VARCHAR(30),
                          cell_phone_number     VARCHAR(30),
                          work_phone_number     VARCHAR(30),
                          emergency_contact_name  VARCHAR(100),
                          emergency_contact_phone VARCHAR(30),
                          referred_by           VARCHAR(100),
                          date_created          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* 2. therapists */
CREATE TABLE therapists (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            first_name     VARCHAR(50)  NOT NULL,
                            last_name      VARCHAR(50)  NOT NULL,
                            email          VARCHAR(150) NOT NULL UNIQUE,
                            phone_number   VARCHAR(30),
                            role           VARCHAR(30),
                            username       VARCHAR(50)  NOT NULL UNIQUE,
                            password_hash  VARCHAR(255) NOT NULL,
                            date_created   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            last_login     TIMESTAMP,
                            active_status  BOOLEAN DEFAULT TRUE
);

/* 3. intake_forms */
CREATE TABLE intake_forms (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              patient_id     BIGINT NOT NULL,
                              therapist_id   BIGINT,
                              date_submitted DATE,
                              practiced_yoga_before BOOLEAN,
                              last_practiced_date   DATE,
                              yoga_frequency        VARCHAR(30),
                              yoga_styles           TEXT,
                              yoga_style_other      VARCHAR(100),
                              yoga_goals            TEXT,
                              yoga_goals_other      VARCHAR(100),
                              yoga_goals_explanation TEXT,
                              yoga_interests        TEXT,
                              yoga_interests_other  VARCHAR(100),
                              activity_level        VARCHAR(30),
                              stress_level          INT CHECK (stress_level BETWEEN 1 AND 10),
                              CONSTRAINT fk_intake_patient   FOREIGN KEY (patient_id)   REFERENCES patients(id),
                              CONSTRAINT fk_intake_therapist FOREIGN KEY (therapist_id) REFERENCES therapists(id)
);

/* 4. intake_form_health_history */
CREATE TABLE intake_form_health_history (
                                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                            intake_form_id BIGINT NOT NULL UNIQUE,
                                            anxiety_depression  BOOLEAN,
                                            arthritis_bursitis  BOOLEAN,
                                            asthma              BOOLEAN,
                                            autoimmune          BOOLEAN,
                                            back_problems       BOOLEAN,
                                            blood_pressure      BOOLEAN,
                                            broken_bones        BOOLEAN,
                                            cancer              BOOLEAN,
                                            diabetes            BOOLEAN,
                                            disc_problems       BOOLEAN,
                                            heart_conditions    BOOLEAN,
                                            insomnia            BOOLEAN,
                                            muscle_strain       BOOLEAN,
                                            numbness_tingling   BOOLEAN,
                                            osteoporosis        BOOLEAN,
                                            pregnancy           BOOLEAN,
                                            pregnancy_edd       VARCHAR(50),
                                            scoliosis           BOOLEAN,
                                            seizures            BOOLEAN,
                                            stroke              BOOLEAN,
                                            surgery             BOOLEAN,
                                            medications         BOOLEAN,
                                            medications_list    TEXT,
                                            additional_notes    TEXT,
                                            CONSTRAINT fk_health_intake FOREIGN KEY (intake_form_id) REFERENCES intake_forms(id)
);

/* 5. soap_notes */
CREATE TABLE soap_notes (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            patient_id   BIGINT NOT NULL,
                            therapist_id BIGINT NOT NULL,
                            date_of_session DATE,
                            time_of_session TIME,
                            session_length  VARCHAR(30),
                            type_of_session VARCHAR(50),
                            s_notes         TEXT,
                            o_notes         TEXT,
                            a_notes         TEXT,
                            p_notes         TEXT,
                            client_response     TEXT,
                            therapist_signature VARCHAR(100),
                            quick_notes         TEXT,
                            date_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            CONSTRAINT fk_soap_patient   FOREIGN KEY (patient_id)   REFERENCES patients(id),
                            CONSTRAINT fk_soap_therapist FOREIGN KEY (therapist_id) REFERENCES therapists(id)
);

/* 6. self_assessments */
CREATE TABLE self_assessments (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  patient_id   BIGINT NOT NULL,
                                  therapist_id BIGINT NOT NULL,
                                  date_of_session DATE,
                                  time_of_session TIME,
                                  session_length    VARCHAR(30),
                                  type_of_session   VARCHAR(50),
                                  goal_of_session   TEXT,
                                  session_content   TEXT,
                                  client_response   TEXT,
                                  observations      TEXT,
                                  assessment        TEXT,
                                  next_steps        TEXT,
                                  therapist_signature VARCHAR(100),
                                  date_created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                  CONSTRAINT fk_self_patient   FOREIGN KEY (patient_id)   REFERENCES patients(id),
                                  CONSTRAINT fk_self_therapist FOREIGN KEY (therapist_id) REFERENCES therapists(id)
);
