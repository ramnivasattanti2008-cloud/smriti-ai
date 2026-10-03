export interface DemoLocation {
  label: string;
  updatedAt: string;
  isSimulated: true;
  sharingEnabled: boolean;
}

const LOCATION_STORAGE_KEY = 'smriti_ai_location_sharing';

export const getDemoLocation = (): DemoLocation => ({
  label: 'At home',
  updatedAt: '8:42 AM',
  isSimulated: true,
  sharingEnabled: localStorage.getItem(LOCATION_STORAGE_KEY) === 'true',
});

export const setLocationSharing = (enabled: boolean): DemoLocation => {
  localStorage.setItem(LOCATION_STORAGE_KEY, String(enabled));
  return getDemoLocation();
};
