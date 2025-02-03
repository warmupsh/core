import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Layout from '@/components/Layout';

const teamMembers = [
  { name: 'John Doe', role: 'CEO', initials: 'JD' },
  { name: 'Sarah Smith', role: 'CTO', initials: 'SS' },
  { name: 'Mike Johnson', role: 'Lead Developer', initials: 'MJ' },
  { name: 'Anna Brown', role: 'Product Manager', initials: 'AB' },
  { name: 'David Wilson', role: 'Designer', initials: 'DW' },
];

export default function Team() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}