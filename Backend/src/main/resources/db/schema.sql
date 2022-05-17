DROP TABLE IF EXISTS user_watching;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS aa_changes;
DROP TABLE IF EXISTS gene_info;
DROP TABLE IF EXISTS who_label;
DROP TABLE IF EXISTS lineage;
DROP TABLE IF EXISTS statistic;
DROP TABLE IF EXISTS region;
DROP TABLE IF EXISTS pango_nomenclature;
DROP TABLE IF EXISTS variant;


CREATE TABLE user
(
    usr_id   INT         NOT NULL PRIMARY KEY,
    usr_name VARCHAR(16) NOT NULL,
    email    VARCHAR(64) NOT NULL,
    passwd   BLOB        NOT NULL,
    salt     BLOB        NOT NULL,
    role     VARCHAR(32) NOT NULL
);

CREATE TABLE variant
(
    v_id           INT         NOT NULL PRIMARY KEY,
    earliest_date  DATE        NOT NULL,
    monitor_level  VARCHAR(4)  NOT NULL,
    R0             FLOAT       NOT NULL,
    avg_incubation FLOAT       NOT NULL,
    descript       VARCHAR(256),
    add_admin      INT         NOT NULL,
    v_status       VARCHAR(12) NOT NULL,
    update_time    DATETIME    NOT NULL,

    FOREIGN KEY (add_admin) REFERENCES user (usr_id)
);

CREATE TABLE pango_nomenclature
(
    v_id    INT                NOT NULL PRIMARY KEY,
    variant VARCHAR(16) UNIQUE NOT NULL,

    FOREIGN KEY (v_id) REFERENCES variant (v_id)
);

CREATE TABLE region
(
    region_id   INT         NOT NULL PRIMARY KEY,
    region_name VARCHAR(16) NOT NULL
);

CREATE TABLE statistic
(
    region_id              INT,
    stat_date              DATE NOT NULL,
    existing_confirmed_cnt INT  NOT NULL,
    death_cnt              INT  NOT NULL,
    cured_cnt              INT  NOT NULL,

    PRIMARY KEY (region_id, stat_date),
    FOREIGN KEY (region_id) REFERENCES region (region_id)
);

CREATE TABLE lineage
(
    child_variant_id  INT PRIMARY KEY,
    parent_variant_id INT,

    FOREIGN KEY (child_variant_id) REFERENCES variant (v_id),
    FOREIGN KEY (parent_variant_id) REFERENCES variant (v_id)
);

CREATE TABLE who_label
(
    v_id  INT PRIMARY KEY,
    label VARCHAR(16) UNIQUE NOT NULL,

    FOREIGN KEY (v_id) REFERENCES variant (v_id)
);

CREATE TABLE gene_info
(
    v_id               INT PRIMARY KEY,
    cDNA_sequence_path VARCHAR(128),

    FOREIGN KEY (v_id) REFERENCES variant (v_id)
);

CREATE TABLE aa_changes
(
    v_id       INT,
    AA_changes VARCHAR(16) NOT NULL,

    PRIMARY KEY (v_id, AA_changes),
    FOREIGN KEY (v_id) REFERENCES variant (v_id)
);

CREATE TABLE user_watching
(
    usr_id        INT,
    watching_v_id INT,

    PRIMARY KEY (usr_id, watching_v_id),
    FOREIGN KEY (usr_id) REFERENCES user (usr_id),
    FOREIGN KEY (watching_v_id) REFERENCES variant (v_id)
);
