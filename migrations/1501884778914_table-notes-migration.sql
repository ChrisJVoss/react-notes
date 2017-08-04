-- up
CREATE TABLE notes (
  id        serial,
  note      text
);

---

-- down
DROP TABLE IF EXISTS notes;
