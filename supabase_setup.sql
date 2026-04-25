-- ============================================================
-- Gateway App – Supabase Setup
-- Run this entire script in Supabase > SQL Editor > New query
-- ============================================================

-- Tables
CREATE TABLE IF NOT EXISTS people (
  id bigint PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS taskers (
  id bigserial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS status_definitions (
  id bigint PRIMARY KEY,
  label text NOT NULL,
  class text NOT NULL,
  category text NOT NULL
);

CREATE TABLE IF NOT EXISTS platforms (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL
);

CREATE TABLE IF NOT EXISTS account_statuses (
  id bigserial PRIMARY KEY,
  person_id bigint REFERENCES people(id),
  platform_id bigint REFERENCES platforms(id),
  status_id bigint REFERENCES status_definitions(id),
  tasker_id bigint,
  tasker_id_1 bigint REFERENCES taskers(id),
  tasker_id_2 bigint REFERENCES taskers(id),
  notes text DEFAULT '',
  UNIQUE(person_id, platform_id)
);

CREATE TABLE IF NOT EXISTS logs (
  id bigint PRIMARY KEY,
  action text NOT NULL,
  timestamp timestamptz NOT NULL
);

-- Seed: people
INSERT INTO people (id, name) VALUES
  (1, 'Haman'), (2, 'Richard'), (3, 'Ivan'), (4, 'Stephanie'),
  (5, 'Judy'), (6, 'Carren'), (7, 'Babajide')
ON CONFLICT (id) DO NOTHING;

-- Seed: taskers
INSERT INTO taskers (id, name) VALUES
  (1, 'Davis'), (2, 'Judy'), (3, 'Newton'), (4, 'Rose'),
  (5, 'Ruth'), (6, 'Sharon'), (7, 'Vincent'), (8, 'Evans'), (9, 'Harveel')
ON CONFLICT (id) DO NOTHING;
SELECT setval('taskers_id_seq', 9);

-- Seed: status_definitions
INSERT INTO status_definitions (id, label, class, category) VALUES
  (1, 'Not created',                   'bg-red-900 text-white',    'Action Required'),
  (2, 'Signed up',                     'bg-orange-600 text-white', 'Action Required'),
  (3, 'Pending email verification',    'bg-amber-500 text-black',  'Action Required'),
  (4, 'Profile not set up',            'bg-yellow-400 text-black', 'Action Required'),
  (5, 'Pending CV upload',             'bg-lime-400 text-black',   'Action Required'),
  (6, 'Pending ID verification',       'bg-green-600 text-white',  'Action Required'),
  (7, 'Pending profile optimization',  'bg-cyan-500 text-black',   'Action Required'),
  (8, 'Account fully active',          'bg-blue-600 text-white',   'Ready / Operating'),
  (9, 'Account in operation',          'bg-purple-600 text-white', 'Ready / Operating')
ON CONFLICT (id) DO NOTHING;

-- Seed: platforms
INSERT INTO platforms (id, name, url) VALUES
  (1,  'Outlier',                    'https://outlier.ai/'),
  (2,  'Prolific',                   'https://www.prolific.com/'),
  (3,  'Mercor',                     'https://www.mercor.com/'),
  (4,  'Scale AI',                   'https://scale.com/'),
  (5,  'Mindrift',                   'https://mindrift.ai/'),
  (6,  'Toloka',                     'https://toloka.ai/'),
  (7,  'Clickworker',                'https://www.clickworker.com/'),
  (8,  'Handshake AI',               'https://joinhandshake.com/ai'),
  (9,  'Appen / CrowdGen',           'https://crowdgen.com/'),
  (10, 'DataAnnotation',             'https://www.dataannotation.tech/'),
  (11, 'Invisible Technologies',     'https://www.invisible.co/'),
  (12, 'TELUS International AI',     'https://www.telusinternational.ai/'),
  (13, 'Alignerr',                   'https://alignerr.com/'),
  (14, 'Lionbridge',                 'https://www.lionbridge.com/'),
  (15, 'LXT AI',                     'https://www.lxt.ai/'),
  (16, 'CloudResearch',              'https://www.cloudresearch.com/'),
  (17, 'OneForma',                   'https://www.oneforma.com/'),
  (18, 'Neevo by Defined.ai',        'https://neevo.defined.ai/'),
  (19, 'OpenTrain AI',               'https://opentrain.ai/'),
  (20, 'Amazon Mechanical Turk',     'https://www.mturk.com/'),
  (21, 'Hive Micro',                 'https://hivemicro.com/'),
  (22, 'Remotely4U',                 'https://www.remotely4u.com/'),
  (23, 'Labelbox',                   'https://labelbox.com/'),
  (24, 'Surge AI',                   'https://www.surgehq.ai/'),
  (25, 'Teemwork.ai',                'https://teemwork.ai/'),
  (26, 'TaskVerse',                  'https://taskverse.com/'),
  (27, 'Microworkers',               'https://www.microworkers.com/'),
  (28, 'UHRS',                       'https://www.clickworker.com/uhrs-universal-human-relevance-system/'),
  (29, 'Cohere AI Careers',          'https://cohere.com/careers'),
  (30, 'ModSquad',                   'https://modsquad.com/'),
  (31, 'Livingston Research',        'https://livingston-research.com/'),
  (32, 'AppJobber',                  'https://www.appjobber.de/'),
  (33, 'UserInterviews',             'https://www.userinterviews.com/'),
  (34, 'UserTesting',                'https://www.usertesting.com/'),
  (35, 'Testlio',                    'https://testlio.com/'),
  (36, 'Tester Work',                'https://testerwork.com/'),
  (37, 'Testbirds',                  'https://www.testbirds.com/'),
  (38, 'uTest',                      'https://www.utest.com/'),
  (39, 'Userlytics',                 'https://www.userlytics.com/'),
  (40, 'Respondent',                 'https://www.respondent.io/'),
  (41, 'Trymata',                    'https://trymata.com/'),
  (42, 'UserCrowd',                  'https://www.usercrowd.com/'),
  (43, 'PlaytestCloud',              'https://www.playtestcloud.com/'),
  (44, 'Prodege',                    'https://www.prodege.com/'),
  (45, 'Luel AI',                    'https://luel.ai/'),
  (46, 'Outsourcely',                'https://www.outsourcely.com/'),
  (47, 'Fiverr',                     'https://www.fiverr.com/'),
  (48, 'Upwork',                     'https://www.upwork.com/'),
  (49, 'Turing',                     'https://www.turing.com/'),
  (50, 'Welocalize AI',              'https://www.welocalize.com/'),
  (51, 'RWS Moravia',                'https://www.rws.com/'),
  (52, 'DeepL Careers',              'https://www.deepl.com/careers'),
  (53, 'Summa Linguae Technologies', 'https://summalinguae.com/'),
  (54, 'Datavio AI',                 'https://datavio.ai/'),
  (55, 'Wellfound',                  'https://wellfound.com/')
ON CONFLICT (id) DO NOTHING;
SELECT setval('platforms_id_seq', 55);

-- Seed: account_statuses
INSERT INTO account_statuses (id, person_id, platform_id, status_id, tasker_id, tasker_id_1, tasker_id_2, notes) VALUES
  (1, 1, 13, 1, 7,    1,    NULL, ''),
  (2, 1, 12, 1, 7,    NULL, NULL, 'Account is already operating and projects are in progress awaiting on-boarding.'),
  (3, 5, 12, 9, 7,    NULL, NULL, ''),
  (4, 6, 12, 7, 5,    NULL, NULL, ''),
  (5, 7, 12, 9, 7,    NULL, NULL, ''),
  (6, 3, 12, 1, 7,    NULL, NULL, ''),
  (7, 1, 55, 9, 1,    7,    1,    ''),
  (8, 7, 55, 9, NULL, NULL, NULL, ''),
  (9, 1,  3, 1, NULL, 7,    NULL, '')
ON CONFLICT (id) DO NOTHING;
SELECT setval('account_statuses_id_seq', 9);

-- Seed: logs
INSERT INTO logs (id, action, timestamp) VALUES
  (1777062863419, 'Haman - Alignerr: Assigned Tasker 1 (Davis)', '2026-04-24T20:34:23.419Z')
ON CONFLICT (id) DO NOTHING;

-- Enable real-time on the tables that need live sync
ALTER TABLE account_statuses REPLICA IDENTITY FULL;
ALTER TABLE platforms REPLICA IDENTITY FULL;
ALTER TABLE taskers REPLICA IDENTITY FULL;
