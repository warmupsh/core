export const memberList = [
  { id: '1', name: 'Alice', team_id: 'A', description: 'Alice is a software engineer in Team A.' },
  { id: '2', name: 'Bob', team_id: 'B', description: 'Bob is a project manager in Team B.' },
  // Add more members as needed
];

export const memberDetails = memberList.reduce((acc, member) => {
  acc[member.id] = member;
  return acc;
}, {} as { [key: string]: typeof memberList[0] });
