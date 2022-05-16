DROP TABLE IF EXISTS UserWatching;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS AAChanges;
DROP TABLE IF EXISTS GeneInfo;
DROP TABLE IF EXISTS WHOLabel;
DROP TABLE IF EXISTS Lineage;
DROP TABLE IF EXISTS Statistic;
DROP TABLE IF EXISTS Region;
DROP TABLE IF EXISTS PangoNomenclature;
DROP TABLE IF EXISTS Variant;
DROP TABLE IF EXISTS Administrator;


CREATE TABLE Administrator
(
    admin_id   INT NOT NULL PRIMARY KEY,
    admin_name VARCHAR(16)  NOT NULL,
    passwd     BLOB         NOT NULL,
    salt       BLOB         NOT NULL
);

CREATE TABLE Variant
(
    v_id           INT                NOT NULL PRIMARY KEY,
    earliest_date  DATE                        NOT NULL,
    monitor_level  ENUM ('VOC', 'VOI', 'VUM')  NOT NULL,
    R0             FLOAT                       NOT NULL,
    avg_incubation FLOAT                       NOT NULL,
    descript       VARCHAR(256),
    add_admin      INT                NOT NULL,
    v_status       ENUM ('Normal', 'Withdraw') NOT NULL,
    update_time    DATETIME                    NOT NULL,

    FOREIGN KEY (add_admin) REFERENCES Administrator (admin_id)
);

CREATE TABLE PangoNomenclature
(
    v_id    INT       NOT NULL PRIMARY KEY,
    variant VARCHAR(16) UNIQUE NOT NULL,

    FOREIGN KEY (v_id) REFERENCES Variant (v_id)
);

CREATE TABLE Region
(
    region_id   INT NOT NULL PRIMARY KEY,
    region_name VARCHAR(16)  NOT NULL
);

CREATE TABLE Statistic
(
    region_id              INT,
    stat_date              DATE         NOT NULL,
    existing_confirmed_cnt INT NOT NULL,
    death_cnt              INT NOT NULL,
    cured_cnt              INT NOT NULL,

    PRIMARY KEY (region_id, stat_date),
    FOREIGN KEY (region_id) REFERENCES Region (region_id)
);

CREATE TABLE Lineage
(
    child_variant_id  INT PRIMARY KEY,
    parent_variant_id INT,

    FOREIGN KEY (child_variant_id) REFERENCES Variant (v_id),
    FOREIGN KEY (parent_variant_id) REFERENCES Variant (v_id)
);

CREATE TABLE WHOLabel
(
    v_id  INT PRIMARY KEY,
    label VARCHAR(16) UNIQUE NOT NULL,

    FOREIGN KEY (v_id) REFERENCES Variant (v_id)
);

CREATE TABLE GeneInfo
(
    v_id          INT PRIMARY KEY,
    cDNA_sequence_path VARCHAR(128),

    FOREIGN KEY (v_id) REFERENCES Variant (v_id)
);

CREATE TABLE AAChanges
(
    v_id       INT,
    AA_changes VARCHAR(16) NOT NULL,

    PRIMARY KEY (v_id, AA_changes),
    FOREIGN KEY (v_id) REFERENCES Variant (v_id)
);

CREATE TABLE User
(
    usr_id   INT NOT NULL PRIMARY KEY,
    usr_name VARCHAR(16)  NOT NULL,
    email    VARCHAR(64)  NOT NULL,
    passwd   BLOB         NOT NULL,
    salt     BLOB         NOT NULL
);

CREATE TABLE UserWatching
(
    usr_id        INT,
    watching_v_id INT,

    PRIMARY KEY (usr_id, watching_v_id),
    FOREIGN KEY (usr_id) REFERENCES User (usr_id),
    FOREIGN KEY (watching_v_id) REFERENCES Variant (v_id)
);
