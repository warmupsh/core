import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from '@/components/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Stats cards */}
        {[
          { title: 'Total Users', value: '1,234' },
          { title: 'Revenue', value: '$12,345' },
          { title: 'Active Projects', value: '23' }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[200px] rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </CardHeader>
        <CardContent>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center py-3 border-b last:border-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-muted-foreground">{item} hour ago</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </Layout>
  );
}