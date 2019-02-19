CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

DROP TABLE "teams";

CREATE TABLE "my_teams" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"competitor_id" VARCHAR(80),
	"person_id" INT REFERENCES "person",
	"league_id" INT REFERENCES "leagues"
);

DROP TABLE "tournament";

CREATE TABLE "leagues" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"tournament_id" VARCHAR(80)
);

INSERT INTO "leagues" ("name", "tournament_id")
VALUES ( 'Spanish La Liga', 'sr:tournament:8' ),
( 'English Premier League', 'sr:tournament:17' ),
( 'Italian Serie A', 'sr:tournament:23' ),
( 'French Ligue 1', 'sr:tournament:34' ),
( 'German Bundesliga', 'sr:tournament:35' ),
( 'Dutch Eredivisie', 'sr:tournament:37' ),
( 'Belgium First Division A', 'sr:tournament:38' ),
( 'Turkish Super Lig', 'sr:tournament:52' ),
( 'Greek Super League', 'sr:tournament:185' ),
( 'Russian Premier League', 'sr:tournament:203' ),
( 'Ukrainian Premier League', 'sr:tournament:218' ),
( 'Portuguese Premier League', 'sr:tournament:238' );

INSERT INTO "my_teams" ("name", "competitor_id", "person_id", "league_id")
VALUES ( 'Manchester City', 'sr:competitor:17', '1', '3' ),
( 'Manchester United', 'sr:competitor:35', '1', '3' ),
( 'Chelsea FC', 'sr:competitor:38', '1', '3' ),
( 'Wolverhampton Wanderers', 'sr:competitor:3', '1', '3' ),
( 'Arsenal FC', 'sr:competitor:42', '1', '3' );

SELECT "my_teams"."name", "my_teams"."competitor_id", "leagues"."tournament_id"
FROM "my_teams"
JOIN "leagues" ON "leagues"."id" = "my_teams"."league_id"
WHERE "my_teams"."person_id" = '1';


CREATE TABLE "teams" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"competitor_id" VARCHAR(80),
	"league_id" INT REFERENCES "leagues"
);


INSERT INTO "teams" ("name", "competitor_id", "league_id")
VALUES ( 'Manchester City', 'sr:competitor:17', '3' ),
( 'Manchester United', 'sr:competitor:35', '3' ),
( 'West Ham United', 'sr:competitor:37', '3' ),
( 'Everton FC', 'sr:competitor:48', '3' ),
( 'Southampton FC', 'sr:competitor:45', '3' ),
( 'Chelsea FC', 'sr:competitor:38', '3' ),
( 'Arsenal FC', 'sr:competitor:42', '3' ),
( 'Newcastle United', 'sr:competitor:39', '3' ),
( 'Leicester City', 'sr:competitor:31', '3' ),
( 'Liverpool FC', 'sr:competitor:44', '3' ),
( 'Tottenham Hotspur', 'sr:competitor:33', '3' ),
( 'Fulham FC', 'sr:competitor:43', '3' ),
( 'Wolverhampton Wanderers', 'sr:competitor:3', '3' ),
( 'Crystal Palace', 'sr:competitor:7', '3' ),
( 'Watford FC', 'sr:competitor:24', '3' ),
( 'Burnley FC', 'sr:competitor:6', '3' ),
( 'Brighton & Hove Albion FC', 'sr:competitor:30', '3' ),
( 'Cardiff City', 'sr:competitor:61', '3' ),
( 'AFC Bournemouth', 'sr:competitor:60', '3' ),
( 'Huddersfield Town', 'sr:competitor:59', '3' );