ALTER TABLE patients
ADD COLUMN therapist_id BIGINT;

ALTER TABLE patients
ADD CONSTRAINT fk_patients_therapist
FOREIGN KEY (therapist_id)
REFERENCES therapists(id);
