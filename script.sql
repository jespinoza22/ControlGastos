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
	ddate		datetime,
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
    nid_coin	int not null,
    namoumnt	decimal(20, 2) not null,
    nid_category	int not null,
    nid_user	int not null,
	ddate		datetime,
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


/*INSERTS CATEGORY*/
insert into controlgastos.tb_category (nid_income_expense, sname_type, sdecription, sactive, nid_user, dregister, nid_user_register)
values (2, 'Ahorro', 'Gastos destinados al Ahorro', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_category (nid_income_expense, sname_type, sdecription, sactive, nid_user, dregister, nid_user_register)
values (2, 'Pago', 'Pago de algun motivo', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_category (nid_income_expense, sname_type, sdecription, sactive, nid_user, dregister, nid_user_register)
values (2, 'Entretenimiento', 'Gasto por algun tipo de entretenimiento', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_category (nid_income_expense, sname_type, sdecription, sactive, nid_user, dregister, nid_user_register)
values (2, 'Compra', 'Gasto por compra de algo', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_category (nid_income_expense, sname_type, sdecription, sactive, nid_user, dregister, nid_user_register)
values (2, 'Membresia', 'Gasto por membresia de algun tipo', 'A', 0, sysdate(), 1);


insert into controlgastos.tb_category (nid_income_expense, sname_type, sdecription, sactive, nid_user, dregister, nid_user_register)
values (1, 'Sueldo', 'Ingreso por sueldo', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_category (nid_income_expense, sname_type, sdecription, sactive, nid_user, dregister, nid_user_register)
values (1, 'Prestado', 'Ingreso por dinero prestado', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_category (nid_income_expense, sname_type, sdecription, sactive, nid_user, dregister, nid_user_register)
values (1, 'Extra', 'Ingreso por extras', 'A', 0, sysdate(), 1);

insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_ANHO', 2019, '2019', 'Valor de Año', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_ANHO', 2020, '2020', 'Valor de Año', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_ANHO', 2021, '2021', 'Valor de Año', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_ANHO', 2022, '2022', 'Valor de Año', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_ANHO', 2023, '2023', 'Valor de Año', 'A', 0, sysdate(), 1);


insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 01, 'Enero', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 02, 'Febrero', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 03, 'Marzo', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 04, 'Abril', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 05, 'Mayo', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 06, 'Junio', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 07, 'Julio', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 08, 'Agosto', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 09, 'Setiembre', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 10, 'Octubre', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 11, 'Noviembre', 'Valor del mes', 'A', 0, sysdate(), 1);
insert into controlgastos.tb_parameter(skey, nid_Value, svalue, sdescription, sactive, nid_user, dregister, nid_user_register)
values ('KEY_MONTH', 12, 'Diciembre', 'Valor del mes', 'A', 0, sysdate(), 1);

