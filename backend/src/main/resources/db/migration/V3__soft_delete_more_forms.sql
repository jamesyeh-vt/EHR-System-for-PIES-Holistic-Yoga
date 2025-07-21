ALTER TABLE soap_notes
    ADD COLUMN active_status BOOLEAN DEFAULT TRUE;
ALTER TABLE self_assessments
    ADD COLUMN active_status BOOLEAN DEFAULT TRUE;