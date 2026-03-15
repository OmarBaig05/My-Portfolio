'use server';

import getDb from '@/lib/db';
import { createSession, destroySession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
        await createSession();
        redirect('/admin');
    }

    return { error: 'Invalid credentials' };
}

export async function logoutAction() {
    await destroySession();
    redirect('/admin-login');
}

// ============ ABOUT ============

export async function getAbout() {
    const db = getDb();
    const row = db.prepare('SELECT * FROM about WHERE id = 1').get() as Record<string, string> | undefined;
    if (!row) return null;
    return {
        ...row,
        roles: JSON.parse(row.roles || '[]'),
        skills: JSON.parse(row.skills || '[]'),
        languages: JSON.parse(row.languages || '[]'),
    };
}

export async function updateAbout(formData: FormData) {
    const db = getDb();
    const name = formData.get('name') as string;
    const roles = formData.get('roles') as string;
    const bio = formData.get('bio') as string;
    const experience_summary = formData.get('experience_summary') as string;
    const skills = formData.get('skills') as string;
    const education_summary = formData.get('education_summary') as string;
    const languages = formData.get('languages') as string;
    const linkedin = formData.get('linkedin') as string;
    const profile_image = formData.get('profile_image') as string | null;

    if (profile_image !== null) {
        db.prepare(`
    UPDATE about SET name=?, roles=?, bio=?, experience_summary=?, skills=?, education_summary=?, languages=?, linkedin=?, profile_image=?
    WHERE id = 1
  `).run(
            name,
            JSON.stringify(roles.split(',').map(r => r.trim()).filter(Boolean)),
            bio,
            experience_summary,
            JSON.stringify(skills.split('\n').map(s => s.trim()).filter(Boolean)),
            education_summary,
            JSON.stringify(languages.split(',').map(l => l.trim()).filter(Boolean)),
            linkedin,
            profile_image
        );
    } else {
        db.prepare(`
    UPDATE about SET name=?, roles=?, bio=?, experience_summary=?, skills=?, education_summary=?, languages=?, linkedin=?
    WHERE id = 1
  `).run(
            name,
            JSON.stringify(roles.split(',').map(r => r.trim()).filter(Boolean)),
            bio,
            experience_summary,
            JSON.stringify(skills.split('\n').map(s => s.trim()).filter(Boolean)),
            education_summary,
            JSON.stringify(languages.split(',').map(l => l.trim()).filter(Boolean)),
            linkedin
        );
    }

    return { success: true };
}

// ============ EXPERIENCE ============

export async function getExperiences() {
    const db = getDb();
    return db.prepare('SELECT * FROM experience ORDER BY sort_order ASC').all();
}

export async function createExperience(formData: FormData) {
    const db = getDb();
    const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM experience').get() as { m: number } | undefined;
    db.prepare('INSERT INTO experience (date_range, role, company, description, sort_order) VALUES (?, ?, ?, ?, ?)').run(
        formData.get('date_range'),
        formData.get('role'),
        formData.get('company'),
        formData.get('description'),
        (maxOrder?.m || 0) + 1
    );
    return { success: true };
}

export async function updateExperience(formData: FormData) {
    const db = getDb();
    db.prepare('UPDATE experience SET date_range=?, role=?, company=?, description=? WHERE id=?').run(
        formData.get('date_range'),
        formData.get('role'),
        formData.get('company'),
        formData.get('description'),
        formData.get('id')
    );
    return { success: true };
}

export async function deleteExperience(id: number) {
    const db = getDb();
    db.prepare('DELETE FROM experience WHERE id=?').run(id);
    return { success: true };
}

// ============ EDUCATION ============

export async function getEducation() {
    const db = getDb();
    return db.prepare('SELECT * FROM education ORDER BY sort_order ASC').all();
}

export async function createEducation(formData: FormData) {
    const db = getDb();
    const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM education').get() as { m: number } | undefined;
    db.prepare('INSERT INTO education (dates, degree, institution, description, sort_order) VALUES (?, ?, ?, ?, ?)').run(
        formData.get('dates'),
        formData.get('degree'),
        formData.get('institution'),
        formData.get('description'),
        (maxOrder?.m || 0) + 1
    );
    return { success: true };
}

export async function updateEducation(formData: FormData) {
    const db = getDb();
    db.prepare('UPDATE education SET dates=?, degree=?, institution=?, description=? WHERE id=?').run(
        formData.get('dates'),
        formData.get('degree'),
        formData.get('institution'),
        formData.get('description'),
        formData.get('id')
    );
    return { success: true };
}

export async function deleteEducation(id: number) {
    const db = getDb();
    db.prepare('DELETE FROM education WHERE id=?').run(id);
    return { success: true };
}

// ============ PROJECTS ============

export async function getProjects() {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM projects ORDER BY sort_order ASC').all() as Record<string, string>[];
    return rows.map(row => ({
        ...row,
        tech_stack: JSON.parse(row.tech_stack || '[]'),
    }));
}

export async function createProject(formData: FormData) {
    const db = getDb();
    const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM projects').get() as { m: number } | undefined;
    const techStack = (formData.get('tech_stack') as string || '').split(',').map(s => s.trim()).filter(Boolean);
    db.prepare('INSERT INTO projects (title, description, image, tech_stack, github_link, live_link, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
        formData.get('title'),
        formData.get('description'),
        formData.get('image') || '',
        JSON.stringify(techStack),
        formData.get('github_link') || '',
        formData.get('live_link') || '',
        (maxOrder?.m || 0) + 1
    );
    return { success: true };
}

export async function updateProject(formData: FormData) {
    const db = getDb();
    const techStack = (formData.get('tech_stack') as string || '').split(',').map(s => s.trim()).filter(Boolean);
    db.prepare('UPDATE projects SET title=?, description=?, image=?, tech_stack=?, github_link=?, live_link=? WHERE id=?').run(
        formData.get('title'),
        formData.get('description'),
        formData.get('image') || '',
        JSON.stringify(techStack),
        formData.get('github_link') || '',
        formData.get('live_link') || '',
        formData.get('id')
    );
    return { success: true };
}

export async function deleteProject(id: number) {
    const db = getDb();
    db.prepare('DELETE FROM projects WHERE id=?').run(id);
    return { success: true };
}

// ============ PUBLICATIONS ============

export async function getPublications() {
    const db = getDb();
    return db.prepare('SELECT * FROM publications ORDER BY sort_order ASC').all();
}

export async function createPublication(formData: FormData) {
    const db = getDb();
    const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM publications').get() as { m: number } | undefined;
    db.prepare('INSERT INTO publications (title, description, date, link, sort_order) VALUES (?, ?, ?, ?, ?)').run(
        formData.get('title'),
        formData.get('description'),
        formData.get('date'),
        formData.get('link') || '',
        (maxOrder?.m || 0) + 1
    );
    return { success: true };
}

export async function updatePublication(formData: FormData) {
    const db = getDb();
    db.prepare('UPDATE publications SET title=?, description=?, date=?, link=? WHERE id=?').run(
        formData.get('title'),
        formData.get('description'),
        formData.get('date'),
        formData.get('link') || '',
        formData.get('id')
    );
    return { success: true };
}

export async function deletePublication(id: number) {
    const db = getDb();
    db.prepare('DELETE FROM publications WHERE id=?').run(id);
    return { success: true };
}

// ============ CERTIFICATIONS ============

export async function getCertifications() {
    const db = getDb();
    return db.prepare('SELECT * FROM certifications ORDER BY sort_order ASC').all();
}

export async function createCertification(formData: FormData) {
    const db = getDb();
    const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM certifications').get() as { m: number } | undefined;
    db.prepare('INSERT INTO certifications (title, issuer, date, link, file_path, file_type, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
        formData.get('title'),
        formData.get('issuer'),
        formData.get('date'),
        formData.get('link') || '',
        formData.get('file_path') || '',
        formData.get('file_type') || '',
        (maxOrder?.m || 0) + 1
    );
    return { success: true };
}

export async function updateCertification(formData: FormData) {
    const db = getDb();
    db.prepare('UPDATE certifications SET title=?, issuer=?, date=?, link=?, file_path=?, file_type=? WHERE id=?').run(
        formData.get('title'),
        formData.get('issuer'),
        formData.get('date'),
        formData.get('link') || '',
        formData.get('file_path') || '',
        formData.get('file_type') || '',
        formData.get('id')
    );
    return { success: true };
}

export async function deleteCertification(id: number) {
    const db = getDb();
    db.prepare('DELETE FROM certifications WHERE id=?').run(id);
    return { success: true };
}

// ============ QUESTIONS ============

export async function submitQuestion(formData: FormData) {
    const db = getDb();
    db.prepare('INSERT INTO questions (name, email, message) VALUES (?, ?, ?)').run(
        formData.get('name'),
        formData.get('email'),
        formData.get('message')
    );
    return { success: true };
}

export async function getQuestions() {
    const db = getDb();
    return db.prepare('SELECT * FROM questions ORDER BY created_at DESC').all();
}

export async function markQuestionRead(id: number) {
    const db = getDb();
    db.prepare('UPDATE questions SET is_read = 1 WHERE id = ?').run(id);
    return { success: true };
}

// ============ SETTINGS ============

export async function getSetting(key: string) {
    const db = getDb();
    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
    return row?.value || '';
}

export async function updateSetting(key: string, value: string) {
    const db = getDb();
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
    return { success: true };
}
