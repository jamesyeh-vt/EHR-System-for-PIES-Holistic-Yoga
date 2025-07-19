ALTER TABLE patients MODIFY COLUMN date_created DATE;

ALTER TABLE therapists ADD COLUMN enabled BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE audit_logs MODIFY COLUMN action varchar(255);
ALTER TABLE audit_logs MODIFY COLUMN entity varchar(255);
ALTER TABLE audit_logs MODIFY COLUMN username varchar(255);

ALTER TABLE intake_form_health_history MODIFY COLUMN additional_notes varchar(255);
ALTER TABLE intake_form_health_history MODIFY COLUMN medications_list varchar(255);
ALTER TABLE intake_form_health_history MODIFY COLUMN pregnancy_edd varchar(255);

ALTER TABLE intake_forms MODIFY COLUMN activity_level varchar(255);
ALTER TABLE intake_forms MODIFY COLUMN yoga_frequency varchar(255);
ALTER TABLE intake_forms MODIFY COLUMN yoga_goals varchar(255);
ALTER TABLE intake_forms MODIFY COLUMN yoga_goals_explanation varchar(255);
ALTER TABLE intake_forms MODIFY COLUMN yoga_goals_other varchar(255);
ALTER TABLE intake_forms MODIFY COLUMN yoga_interests varchar(255);
ALTER TABLE intake_forms MODIFY COLUMN yoga_interests_other varchar(255);
ALTER TABLE intake_forms MODIFY COLUMN yoga_style_other varchar(255);
ALTER TABLE intake_forms MODIFY COLUMN yoga_styles varchar(255);

ALTER TABLE patients MODIFY COLUMN cell_phone_number varchar(255);
ALTER TABLE patients MODIFY COLUMN city varchar(255);
ALTER TABLE patients MODIFY COLUMN email varchar(255);
ALTER TABLE patients MODIFY COLUMN emergency_contact_name varchar(255);
ALTER TABLE patients MODIFY COLUMN emergency_contact_phone varchar(255);
ALTER TABLE patients MODIFY COLUMN first_name varchar(255) NOT NULL;
ALTER TABLE patients MODIFY COLUMN home_phone_number varchar(255);
ALTER TABLE patients MODIFY COLUMN last_name varchar(255) NOT NULL;
ALTER TABLE patients MODIFY COLUMN referred_by varchar(255);
ALTER TABLE patients MODIFY COLUMN state varchar(255);
ALTER TABLE patients MODIFY COLUMN work_phone_number varchar(255);
ALTER TABLE patients MODIFY COLUMN zip_code varchar(255);

ALTER TABLE self_assessments MODIFY COLUMN assessment varchar(255);
ALTER TABLE self_assessments MODIFY COLUMN goal_of_session varchar(255);

ALTER TABLE soap_notes MODIFY COLUMN a_notes varchar(255);
ALTER TABLE soap_notes MODIFY COLUMN o_notes varchar(255);
ALTER TABLE soap_notes MODIFY COLUMN p_notes varchar(255);
ALTER TABLE soap_notes MODIFY COLUMN s_notes varchar(255);
ALTER TABLE soap_notes MODIFY COLUMN session_length varchar(255);
ALTER TABLE soap_notes MODIFY COLUMN type_of_session varchar(255);

ALTER TABLE therapists MODIFY COLUMN email varchar(255);
ALTER TABLE therapists MODIFY COLUMN first_name varchar(255);
ALTER TABLE therapists MODIFY COLUMN last_name varchar(255);
ALTER TABLE therapists MODIFY COLUMN phone_number varchar(255);
ALTER TABLE therapists MODIFY COLUMN username varchar(255) NOT NULL;
