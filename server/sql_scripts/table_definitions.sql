create table Users (
                      UserID      int primary key auto_increment
                    , Email       nvarchar(255) not null
                    , Password    nvarchar(255) not null
                   )
;

create table Participates (
                             UserID    int primary key
                           , SurveyID  int not null
                          )
;

create table Surveys (
                        SurveyID    int primary key auto_increment
                      , UserID      int not null
                      , Title       nvarchar(255) not null
                      , Description nvarchar(255) not null
                      , StartDate   date not null
                      , EndDate     date not null
                     )
;

create table Questions (
                        QuestionID      int primary key auto_increment
                      , SurveyID        int not null
                      , QuestionType    boolean not null
                      , Question        nvarchar(255) not null
                     )
;

create table Responses (
                        UserID      int not null
                      , QuestionID  int not null
                      , Response    nvarchar(255) not null
                     )
;

/* Getting Author's Surveys */
select * 
  from Surveys s
 where s.UserID = @example_id
;

/* Get Participants's Surveys */
select *
  from Surveys s
  join Participants p
    on s.SurveyID = p.SurveyID
  join Users u
    on u.UserID = p.UserID
;

/* Get All Survey Responses */
select *
  from Surveys s
  join Questions q
    on s.SurveyID = q.SurveyID
  join Responses r
    on q.QuestionID = r.QuestionID





*S3cretP4ssword!* *Ubun7u!* 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