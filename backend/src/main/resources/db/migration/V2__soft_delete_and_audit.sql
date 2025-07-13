ALTER TABLE patients ADD COLUMN active_status BOOLEAN DEFAULT TRUE;
ALTER TABLE intake_forms ADD COLUMN active_status BOOLEAN DEFAULT TRUE;

CREATE TABLE audit_logs (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            username VARCHAR(100),
                            action VARCHAR(50),
                            entity VARCHAR(100),
                            entity_id BIGINT,
                            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);