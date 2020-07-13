DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS variations;

-- CREATE TABLE variations (
--   id int,
--   color VARCHAR,
--   images VARCHAR,
--   cost int
-- );

CREATE TABLE products (
  id int,
  title VARCHAR,
  description VARCHAR,
  rating int,
  variations JSONB
);
