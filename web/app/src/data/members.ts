export const memberList = [
  { id: 'asfasfasf', name: 'Alice', team_id: 'A', description: 'Alice is a software engineer in Team A.' },
  { id: '124312d12', name: 'Bob', team_id: 'B', description: 'Bob is a project manager in Team B.' },
  { id: '3', name: 'Carlos', team_id: 'A', description: 'Carlos is a designer in Team A.' },
  { id: '4', name: 'Diana', team_id: 'B', description: 'Diana is a QA engineer in Team B.' },
  { id: '5', name: 'Elena', team_id: 'C', description: 'Elena is a product manager in Team C.' },
  { id: '6', name: 'Fernando', team_id: 'D', description: 'Fernando is a backend developer in Team D.' },
  { id: '7', name: 'Gabriela', team_id: 'E', description: 'Gabriela is a frontend developer in Team E.' },
  { id: '8', name: 'Hector', team_id: 'A', description: 'Hector is a DevOps engineer in Team A.' },
  { id: '9', name: 'Isabel', team_id: 'B', description: 'Isabel is a UX researcher in Team B.' },
  { id: '10', name: 'Javier', team_id: 'C', description: 'Javier is a data scientist in Team C.' },
  { id: '11', name: 'Karen', team_id: 'D', description: 'Karen is a business analyst in Team D.' },
  { id: '12', name: 'Luis', team_id: 'E', description: 'Luis is a scrum master in Team E.' },
  // Add more members as needed
];

export const memberDetails = memberList.reduce((acc, member) => {
  acc[member.id] = member;
  return acc;
}, {} as { [key: string]: typeof memberList[0] });

export const getMemberById = (id) => {
  return memberList.find(member => member.id === id);
};

export const updateMember = (updatedMember) => {
  const index = memberList.findIndex(member => member.id === updatedMember.id);
  if (index !== -1) {
    memberList[index] = updatedMember;
  }
};
