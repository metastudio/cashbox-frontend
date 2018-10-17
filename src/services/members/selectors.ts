import { IMembersState } from './types';

const selectMembers       = (state: { members: IMembersState}) => state.members.items;
const selectMembersStatus = (state: { members: IMembersState}) => state.members.status;

export { selectMembers, selectMembersStatus };
