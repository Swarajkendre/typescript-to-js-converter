// Example TypeScript file to convert

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    if (this.validateUser(user)) {
      this.users.push(user);
      console.log(`User ${user.name} added successfully`);
    }
  }

  private validateUser(user: User): boolean {
    return user.name.length > 0 && user.email.includes('@');
  }

  getUser(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Usage
const manager = new UserManager();
manager.addUser({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  isActive: true
});

manager.addUser({
  id: 2,
  name: 'Jane Smith',
  email: 'jane@example.com',
  isActive: false
});

console.log('All Users:', manager.getAllUsers());
