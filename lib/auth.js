import jwt from 'jsonwebtoken';

export async function authenticateToken(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json({ error: 'Authorization token missing or malformed' },{status : 400});
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded }; 
  } catch (error) {
    return { error: 'Invalid or expired token' };
  }
}
