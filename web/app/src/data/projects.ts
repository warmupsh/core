export const projectList = [
  { id: '1', name: 'Project Alpha', description: 'Description for Project Alpha', teams: [{ name: 'Team A', team_id: 'A' }, { name: 'Team B', team_id: 'B' }] },
  { id: '2', name: 'Project Beta', description: 'Description for Project Beta', teams: [{ name: 'Team B', team_id: 'B' }, { name: 'Team C', team_id: 'C' }] },
  { id: '3', name: 'Project Gamma', description: 'Description for Project Gamma', teams: [{ name: 'Team C', team_id: 'C' }, { name: 'Team D', team_id: 'D' }] },
  { id: '4', name: 'Project Delta', description: 'Description for Project Delta', teams: [{ name: 'Team D', team_id: 'D' }, { name: 'Team E', team_id: 'E' }] },
  { id: '5', name: 'Project Epsilon', description: 'Description for Project Epsilon', teams: [{ name: 'Team E', team_id: 'E' }, { name: 'Team A', team_id: 'A' }] },
];

export const projectDetails = projectList.reduce((acc, project) => {
  acc[project.id] = project;
  return acc;
}, {} as { [key: string]: typeof projectList[0] });
