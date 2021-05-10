INSERT INTO departments (name)
VALUES
    ("Support"),
    ("Human Resources"),
    ("Legal"),
    ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Consumer Support Agent", 60000, 1),
    ("Business Support Agent", 80000, 1),
    ("Human Resources Manager", 100000, 2),
    ("Human Resources Coordinator", 125000, 2),
    ("Legal Consultant", 150000, 3),
    ("Marketing Manager", 115000, 4),
    ("Marketing Coordinator", 175000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 2, 2),
  ('Charles', 'LeRoi', 2, 2),
  ('Katherine', 'Mansfield', 3, 3),
  ('Dora', 'Carrington', 4, 4),
  ('Edward', 'Bellamy', 5, NULL),
  ('Montague', 'Summers', 6, 4),
  ('Octavia', 'Butler', 6, 4),
  ('Unica', 'Zurn', 7, NULL);