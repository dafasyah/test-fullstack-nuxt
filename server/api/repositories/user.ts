interface User {
  id: string
  username: string
  password: string
  role: "admin" | "employee"
}

// Mock user database
const users: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin",
    role: "admin",
  },
  {
    id: "2",
    username: "employee",
    password: "employee",
    role: "employee",
  },
]

export async function getUser(username: string, password: string): Promise<User | null> {
  const user = users.find((u) => u.username === username && u.password === password)
  return user || null
}

export async function getUserById(id: string): Promise<Omit<User, "password"> | null> {
  const user = users.find((u) => u.id === id)
  return user ? { id: user.id, username: user.username, role: user.role } : null
}
