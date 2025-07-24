-- Step 1: Backfill NULLs with 0 for all boolean columns
UPDATE intake_form_health_history
SET
    anxiety_depression = IFNULL(anxiety_depression, 0),
    arthritis_bursitis = IFNULL(arthritis_bursitis, 0),
    asthma = IFNULL(asthma, 0),
    autoimmune = IFNULL(autoimmune, 0),
    back_problems = IFNULL(back_problems, 0),
    blood_pressure = IFNULL(blood_pressure, 0),
    broken_bones = IFNULL(broken_bones, 0),
    cancer = IFNULL(cancer, 0),
    diabetes = IFNULL(diabetes, 0),
    disc_problems = IFNULL(disc_problems, 0),
    heart_conditions = IFNULL(heart_conditions, 0),
    insomnia = IFNULL(insomnia, 0),
    muscle_strain = IFNULL(muscle_strain, 0),
    numbness_tingling = IFNULL(numbness_tingling, 0),
    osteoporosis = IFNULL(osteoporosis, 0),
    pregnancy = IFNULL(pregnancy, 0),
    scoliosis = IFNULL(scoliosis, 0),
    seizures = IFNULL(seizures, 0),
    stroke = IFNULL(stroke, 0),
    surgery = IFNULL(surgery, 0),
    medications = IFNULL(medications, 0);

-- Step 2: Modify columns to NOT NULL + DEFAULT 0
ALTER TABLE intake_form_health_history
MODIFY anxiety_depression BOOLEAN NOT NULL DEFAULT 0,
MODIFY arthritis_bursitis BOOLEAN NOT NULL DEFAULT 0,
MODIFY asthma BOOLEAN NOT NULL DEFAULT 0,
MODIFY autoimmune BOOLEAN NOT NULL DEFAULT 0,
MODIFY back_problems BOOLEAN NOT NULL DEFAULT 0,
MODIFY blood_pressure BOOLEAN NOT NULL DEFAULT 0,
MODIFY broken_bones BOOLEAN NOT NULL DEFAULT 0,
MODIFY cancer BOOLEAN NOT NULL DEFAULT 0,
MODIFY diabetes BOOLEAN NOT NULL DEFAULT 0,
MODIFY disc_problems BOOLEAN NOT NULL DEFAULT 0,
MODIFY heart_conditions BOOLEAN NOT NULL DEFAULT 0,
MODIFY insomnia BOOLEAN NOT NULL DEFAULT 0,
MODIFY muscle_strain BOOLEAN NOT NULL DEFAULT 0,
MODIFY numbness_tingling BOOLEAN NOT NULL DEFAULT 0,
MODIFY osteoporosis BOOLEAN NOT NULL DEFAULT 0,
MODIFY pregnancy BOOLEAN NOT NULL DEFAULT 0,
MODIFY scoliosis BOOLEAN NOT NULL DEFAULT 0,
MODIFY seizures BOOLEAN NOT NULL DEFAULT 0,
MODIFY stroke BOOLEAN NOT NULL DEFAULT 0,
MODIFY surgery BOOLEAN NOT NULL DEFAULT 0,
MODIFY medications BOOLEAN NOT NULL DEFAULT 0;

