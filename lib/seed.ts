import getDb from './db';

const db = getDb();

// Clear existing data
db.exec(`DELETE FROM about; DELETE FROM experience; DELETE FROM education; DELETE FROM projects; DELETE FROM publications; DELETE FROM certifications; DELETE FROM questions; DELETE FROM settings;`);

// Seed About
db.prepare(`INSERT INTO about (id, name, roles, bio, experience_summary, skills, education_summary, languages, linkedin, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    1,
    'Omar Bashir',
    JSON.stringify(['ML Engineer', 'AI Researcher', 'Full-Stack Developer', 'Data Scientist']),
    'Passionate technologist with a deep focus on machine learning, artificial intelligence, and full-stack development. I build intelligent systems that solve real-world problems and create beautiful, performant web experiences.',
    '5+ years of experience in AI/ML and software engineering',
    JSON.stringify(['Python', 'TypeScript', 'React', 'Next.js', 'TensorFlow', 'PyTorch', 'Node.js', 'SQL', 'Docker', 'AWS', 'Git', 'FastAPI', 'Tailwind CSS', 'PostgreSQL']),
    'M.S. in Computer Science, B.S. in Software Engineering',
    JSON.stringify(['English', 'Urdu', 'Arabic']),
    'https://linkedin.com/in/omarbashir',
    ''
);

// Seed Experience
const insertExp = db.prepare(`INSERT INTO experience (date_range, role, company, description, sort_order) VALUES (?, ?, ?, ?, ?)`);
insertExp.run('2023 - Present', 'Senior ML Engineer', 'TechCorp AI', 'Leading the development of production ML pipelines and NLP models. Architected a real-time recommendation engine serving 10M+ users.', 1);
insertExp.run('2021 - 2023', 'Full-Stack Developer', 'InnovateTech', 'Built scalable web applications using React, Next.js, and Node.js. Led migration from monolith to microservices architecture.', 2);
insertExp.run('2019 - 2021', 'AI Research Assistant', 'University AI Lab', 'Conducted research on transformer architectures and published papers on efficient NLP models. Developed open-source ML tools.', 3);

// Seed Education
const insertEdu = db.prepare(`INSERT INTO education (dates, degree, institution, description, sort_order) VALUES (?, ?, ?, ?, ?)`);
insertEdu.run('2021 - 2023', 'M.S. Computer Science', 'Stanford University', 'Specialization in Artificial Intelligence and Machine Learning. GPA: 3.9/4.0', 1);
insertEdu.run('2017 - 2021', 'B.S. Software Engineering', 'MIT', 'Focus on algorithms, distributed systems, and software architecture. Dean\'s List all semesters.', 2);

// Seed Projects
const insertProj = db.prepare(`INSERT INTO projects (title, description, image, tech_stack, github_link, live_link, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`);
insertProj.run('AI Chat Assistant', 'An intelligent chatbot powered by GPT-4 with context-aware responses, multi-language support, and real-time streaming.', '', JSON.stringify(['Python', 'FastAPI', 'React', 'WebSocket', 'OpenAI']), 'https://github.com/example/ai-chat', 'https://ai-chat-demo.vercel.app', 1);
insertProj.run('Smart Analytics Dashboard', 'Real-time analytics platform with interactive visualizations, predictive modeling, and automated reporting for business intelligence.', '', JSON.stringify(['Next.js', 'D3.js', 'PostgreSQL', 'Python', 'Docker']), 'https://github.com/example/analytics', '', 2);
insertProj.run('Neural Style Transfer App', 'A web application that applies artistic styles to images using deep neural networks with real-time preview and batch processing.', '', JSON.stringify(['PyTorch', 'Flask', 'React', 'AWS Lambda']), 'https://github.com/example/style-transfer', 'https://style-transfer.demo.com', 3);

// Seed Publications
const insertPub = db.prepare(`INSERT INTO publications (title, description, date, link, sort_order) VALUES (?, ?, ?, ?, ?)`);
insertPub.run('Efficient Transformer Architectures for Low-Resource NLP', 'A novel approach to reducing transformer model size while maintaining performance on low-resource language tasks.', '2023-06', 'https://arxiv.org/example1', 1);
insertPub.run('Scalable Real-Time Recommendation Systems', 'Design patterns and implementation strategies for building recommendation engines that scale to millions of users.', '2022-11', 'https://arxiv.org/example2', 2);

// Seed Certifications
const insertCert = db.prepare(`INSERT INTO certifications (title, issuer, date, link, file_path, file_type, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`);
insertCert.run('AWS Solutions Architect Professional', 'Amazon Web Services', '2023-08', 'https://aws.amazon.com/certification/', '', '', 1);
insertCert.run('TensorFlow Developer Certificate', 'Google', '2022-05', 'https://www.tensorflow.org/certificate', '', '', 2);
insertCert.run('Meta Front-End Developer Professional Certificate', 'Meta', '2022-01', 'https://www.coursera.org/professional-certificates/meta-front-end-developer', '', '', 3);

// Seed Settings
db.prepare(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`).run('resume_path', '');
db.prepare(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`).run('contact_address', '123 Tech Avenue, San Francisco, CA 94105');
db.prepare(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`).run('contact_email', 'omar@example.com');
db.prepare(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`).run('contact_github', 'https://github.com/omarbashir');

console.log('✅ Database seeded successfully!');
process.exit(0);
