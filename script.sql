create table controlgastos.tb_user (
	nid_user	int	not null auto_increment,
    suser	varchar(50),
    spassword varchar(1000),
    snames	varchar(100),
    slastname	varchar(100),
    slastname2	varchar(100),
    semail		varchar(200),
    sphone		varchar(20),
    saddress	varchar(200),
    sactive		char(1),
    dregister	datetime,
    nid_user_register	int,
    dupdate		datetime,
    nid_user_update		int,
    primary key (nid_user)
);

create table controlgastos.tb_category (
	nid_category	int	not null auto_increment,
    nid_income_expense	int,
    sname_type	varchar(50),
    sdecription	varchar(200),
    sactive		char(1),
    nid_user	int not null,
    dregister	datetime,
    nid_user_register	int,
    dupdate		datetime,
    nid_user_update	int,
    primary key (nid_category)
);

create table controlgastos.tb_income (
	nid_income	int not null auto_increment,
    nid_coin	int not null,
    namoumnt	decimal(20, 2) not null,
    nid_category	int not null,
    nid_user	int not null,
    sdescription	varchar(500),
    sactive		char(1),
    dregister	datetime,
    nid_user_register	int,
    dupdate		datetime,
    nid_user_update	int,
    primary key (nid_income),
    foreign key (nid_user) references controlgastos.tb_user (nid_user),
    foreign key (nid_category) references controlgastos.tb_category (nid_category)
);

create table controlgastos.tb_expense (
	nid_expense	int not null auto_increment,
    nid_coina	int not null,
    namoumnt	decimal(20, 2) not null,
    nid_category	int not null,
    nid_user	int not null,
    sdescription	varchar(500),
    sactive		char(1),
    dregister	datetime,
    nid_user_register	int,
    dupdate		datetime,
    nid_user_update	int,
    primary key (nid_expense),
    foreign key (nid_user) references controlgastos.tb_user (nid_user),    
    foreign key (nid_category) references controlgastos.tb_category (nid_category)
);

create table controlgastos.tb_parameter(
	nid_parameter		int not null auto_increment,
    skey				varchar(200),
    nid_value			int,
    svalue				varchar(200),
    sdescription		varchar(500),
    sactive				char(1),
    nid_user			int not null,
    dregister			datetime,
    nid_user_register	int,
    dupdate				datetime,
    nid_user_update		int,
    primary key (nid_parameter)
);

/*drop table controlgastos.tb_category;
drop table controlgastos.tb_income;
drop table controlgastos.tb_expense;
drop table controlgastos.tb_parameter;
drop table controlgastos.tb_user;*/


/*INSERTS BASE*/
insert into controlgastos.tb_parameter (skey, nid_value, svalue, sdescription,	sactive, nid_user, dregister, nid_user_register, dupdate, nid_user_update) 
values ('KEY_TIPO', 1, 'INGRESO', 'Tipo Ingreso', 'A', 0, sysdate(), 1, null, null);

insert into controlgastos.tb_parameter (skey, nid_value, svalue, sdescription,	sactive, nid_user, dregister, nid_user_register, dupdate, nid_user_update) 
values ('KEY_TIPO', 2, 'GASTO', 'Tipo Ingreso', 'A', 0, sysdate(), 1, null, null);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'