DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id        serial,
  note      text
);

INSERT INTO notes (note) VALUES
  ('delectus aut autem'),
  ('quis ut nam facilis et officia qui'),
  ('fugiat veniam minus');

SELECT * FROM notes
