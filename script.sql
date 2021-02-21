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

create table controlgastos.tb_income (
	nid_income	int not null auto_increment,
    nid_coin	int not null,
    namoumnt	decimal(20, 2) not null,
    nid_type	int not null,
    nid_user	int not null,
    sdescription	varchar(500),
    sactive		char(1),
    dregister	datetime,
    nid_user_register	int,
    dupdate		datetime,
    nid_user_update	int,
    primary key (nid_income),
    foreign key (nid_user) references controlgastos.tb_user (nid_user),
    foreign key (nid_type) references controlgastos.tb_type_income_expense (nid_type)
);

create table controlgastos.tb_expense (
	nid_expense	int not null auto_increment,
    nid_coina	int not null,
    namoumnt	decimal(20, 2) not null,
    nid_type	int not null,
    nid_user	int not null,
    sdescription	varchar(500),
    sactive		char(1),
    dregister	datetime,
    nid_user_register	int,
    dupdate		datetime,
    nid_user_update	int,
    primary key (nid_expense),
    foreign key (nid_user) references controlgastos.tb_user (nid_user),    
    foreign key (nid_type) references controlgastos.tb_type_income_expense (nid_type)
);


create table controlgastos.tb_type_income_expense (
	nid_type	int	not null auto_increment,
    nid_income_expense	int,
    sname_type	varchar(50),
    sdecription	varchar(200),
    sactive		char(1),
    dregister	datetime,
    nid_user_register	int,
    dupdate		datetime,
    nid_user_update	int,
    primary key (nid_type)
);

create table controlgastos.tb_parameter(
	nid_parameter	int not null auto_increment,
    nid_value		int,
    svalue			varchar(200),
    sdescription	varchar(500),
    sactive		char(1),
    dregister	datetime,
    nid_user_register	int,
    dupdate		datetime,
    nid_user_update	int,
    primary key (nid_parameter)
)