import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE = 'authenticated';

export async function createSession() {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
    });
}

export async function verifySession(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    return session?.value === SESSION_VALUE;
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}
