import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { Users, Activity, UserPlus, Shield } from 'lucide-react'
import { Navigate } from 'react-router-dom'

export default function Admin() {
  const { user, profile, isAdmin, loading } = useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPreps: 0,
    averagePreps: 0,
    activeUsers: 0
  })
  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [newAdminName, setNewAdminName] = useState('')
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false)

  // Redirect if not admin
  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    if (isAdmin) {
      fetchUsers()
      fetchAnalytics()
      fetchStats()
    }
  }, [isAdmin])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    }
  }

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('usage_analytics')
        .select('*, profiles(name, email)')
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw error
      setAnalytics(data || [])
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('prep_count')

      if (usersError) throw usersError

      const totalUsers = users?.length || 0
      const totalPreps = users?.reduce((sum, user) => sum + user.prep_count, 0) || 0
      const averagePreps = totalUsers > 0 ? totalPreps / totalUsers : 0

      // Count active users (users who have used at least one prep)
      const activeUsers = users?.filter(user => user.prep_count < 5).length || 0

      setStats({
        totalUsers,
        totalPreps,
        averagePreps: Math.round(averagePreps * 100) / 100,
        activeUsers
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const createAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword || !newAdminName) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsCreatingAdmin(true)
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email: newAdminEmail,
        password: newAdminPassword,
      })

      if (error) throw error

      if (data.user) {
        // Create admin profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: newAdminEmail,
            name: newAdminName,
            role: 'admin',
            prep_count: 0,
          })

        if (profileError) throw profileError

        toast({
          title: "Success",
          description: "Admin account created successfully",
        })

        setNewAdminEmail('')
        setNewAdminPassword('')
        setNewAdminName('')
        setIsCreateAdminOpen(false)
        fetchUsers()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsCreatingAdmin(false)
    }
  }

  const updateUserPrepCount = async (userId: string, newCount: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ prep_count: newCount })
        .eq('id', userId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Prep count updated successfully",
      })

      fetchUsers()
      fetchStats()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-accent-light/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-accent-light/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and view platform analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Preps Used</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{5 * stats.totalUsers - stats.totalPreps}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Preps Remaining</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averagePreps}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Dialog open={isCreateAdminOpen} onOpenChange={setIsCreateAdminOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Admin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Admin Account</DialogTitle>
                    <DialogDescription>
                      Create a new admin account with full access to the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adminName">Name</Label>
                      <Input
                        id="adminName"
                        value={newAdminName}
                        onChange={(e) => setNewAdminName(e.target.value)}
                        placeholder="Admin name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminEmail">Email</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="admin@hirescout.in"
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminPassword">Password</Label>
                      <Input
                        id="adminPassword"
                        type="password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        placeholder="Strong password"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={createAdmin}
                      disabled={isCreatingAdmin}
                    >
                      {isCreatingAdmin ? "Creating..." : "Create Admin"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Prep Count</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.college || 'Not specified'}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{user.prep_count}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateUserPrepCount(user.id, user.prep_count + 1)}
                            >
                              +1
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateUserPrepCount(user.id, 5)}
                          >
                            Reset Preps
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Recent user activity on the platform</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.profiles?.name || 'Unknown'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.action}</Badge>
                        </TableCell>
                        <TableCell>
                          {log.details?.email && <span className="text-sm text-muted-foreground">{log.details.email}</span>}
                        </TableCell>
                        <TableCell>
                          {new Date(log.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}