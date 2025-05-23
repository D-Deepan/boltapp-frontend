import React, { useState } from 'react';
import { 
  PlusCircle, UserPlus, UserCog, Search, Edit, Trash, 
  UserCheck, ShieldCheck, CheckCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { UserRole } from '../../stores/authStore';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Jane Smith',
    email: 'faculty@example.com',
    role: 'faculty' as UserRole,
    department: 'CSE',
    status: 'active',
    createdAt: '2025-01-15'
  },
  {
    id: '2',
    name: 'Prof. Michael Johnson',
    email: 'incharge@example.com',
    role: 'incharge' as UserRole,
    department: 'CSE',
    status: 'active',
    createdAt: '2025-01-10'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
    department: 'Admin',
    status: 'active',
    createdAt: '2025-01-01'
  },
  {
    id: '4',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@example.com',
    role: 'faculty' as UserRole,
    department: 'ECE',
    status: 'active',
    createdAt: '2025-02-05'
  },
  {
    id: '5',
    name: 'Prof. Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'incharge' as UserRole,
    department: 'ECE',
    status: 'active',
    createdAt: '2025-02-10'
  }
];

const AdminUsers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  
  // Filter users based on search, role, and department
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = search === '' || 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    const matchesDepartment = departmentFilter === '' || user.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });
  
  // Get unique departments for filter options
  const departments = Array.from(new Set(mockUsers.map(user => user.department)));
  
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Badge variant="primary">Admin</Badge>;
      case 'incharge':
        return <Badge variant="secondary">Incharge</Badge>;
      case 'faculty':
        return <Badge variant="default">Faculty</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="page-transition">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-600">
            Create and manage user accounts for faculty and incharges
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button 
            variant="secondary"
            leftIcon={<UserCog size={16} />}
          >
            Assign Incharge
          </Button>
          <Button 
            variant="primary"
            leftIcon={<UserPlus size={16} />}
          >
            Create User
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            />
            
            <Select
              placeholder="Filter by role"
              options={[
                { value: '', label: 'All Roles' },
                { value: 'faculty', label: 'Faculty' },
                { value: 'incharge', label: 'Incharge' },
                { value: 'admin', label: 'Admin' }
              ]}
              value={roleFilter}
              onChange={(value) => setRoleFilter(value)}
            />
            
            <Select
              placeholder="Filter by department"
              options={[
                { value: '', label: 'All Departments' },
                ...departments.map(dept => ({ value: dept, label: dept }))
              ]}
              value={departmentFilter}
              onChange={(value) => setDepartmentFilter(value)}
            />
          </div>
        </Card.Body>
      </Card>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-2">
                        {user.role === 'admin' ? (
                          <ShieldCheck className="h-5 w-5 text-blue-600" />
                        ) : user.role === 'incharge' ? (
                          <UserCheck className="h-5 w-5 text-blue-600" />
                        ) : (
                          <UserCog className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <div className="text-sm text-gray-900">Active</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;