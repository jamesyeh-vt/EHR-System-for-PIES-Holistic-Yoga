ALTER TABLE patients
ADD COLUMN assigned_therapist_id BIGINT;

ALTER TABLE patients
ADD CONSTRAINT fk_patient_therapist
FOREIGN KEY (assigned_therapist_id)
REFERENCES therapists(id)
ON DELETE SET NULL;
