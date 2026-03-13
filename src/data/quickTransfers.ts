import abigail from '../assets/images/avatars/abigail.svg';
import manuel from '../assets/images/avatars/manuel.svg';
import gracie from '../assets/images/avatars/gracie.svg';
import prince from '../assets/images/avatars/prince.svg'; 
import lukas from '../assets/images/avatars/lukas.svg';

export interface QuickTransfer {
  id: string | number;
  name: string;
  avatar: string;
}

export const quickTransfers: QuickTransfer[] = [
  { id: 1, name: 'Abigail', avatar: abigail },
  { id: 2, name: 'Manuel', avatar: manuel },
  { id: 3, name: 'Gracie', avatar: gracie },
  { id: 4, name: 'Prince', avatar: prince },
  { id: 5, name: 'Lukas', avatar: lukas },
];
