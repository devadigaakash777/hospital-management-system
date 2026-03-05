import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
} from 'react-native';
import { colors } from '../../../theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/* ================= TYPES ================= */

export interface CreateStaffData {
  name: string;
  role: string;
  departments: string[];
  permissions: string[];
  group?: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: CreateStaffData) => void;
  // ── NEW ──
  editMode?: boolean;
  initialData?: CreateStaffData;
  onEdit?: (data: CreateStaffData) => void;
}

/* ================= DATA ================= */

const GROUPS = [
  'Front Desk',
  'Doctor Assistant',
  'Billing Staff',
  'Admin Staff',
];

const DEPARTMENTS = [
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Nephrology',
  'Endocrinology',
  'Orthopedics',
  'Radiology',
  'Oncology',
];

const PERMISSIONS = [
  'Can Manage Doctor Slots',
  'Can Manage Staff',
  'Can Manage Groups',
  'Can Export Reports',
  'Can Manage Health Packages',
];

/* ================= COMPONENT ================= */

const CreateStaffModal: React.FC<Props> = ({
  visible,
  onClose,
  onCreate,
  editMode = false,
  initialData,
  onEdit,
}) => {
  const [mode, setMode] = useState<'group' | 'manual'>('manual');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  /* ── Pre-fill when editing ── */
  useEffect(() => {
    if (editMode && initialData) {
      setName(initialData.name);
      setRole(initialData.role);
      setSelectedDepartments(initialData.departments);
      setSelectedPermissions(initialData.permissions);
      setSelectedGroup(initialData.group || '');
      setMode(initialData.group ? 'group' : 'manual');
    }
  }, [editMode, initialData, visible]);

  /* ── RESET ── */
  const resetForm = () => {
    setName('');
    setRole('');
    setSelectedDepartments([]);
    setSelectedPermissions([]);
    setSelectedGroup('');
    setShowDropdown(false);
    setMode('manual');
  };

  /* ── CANCEL WITH CONFIRMATION ── */
  const handleCancel = () => {
    Alert.alert(
      'Cancel',
      'Are you sure you want to cancel? All entered data will be lost.',
      [
        { text: 'No, Continue', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            resetForm();
            onClose();
          },
        },
      ],
    );
  };

  /* ── TOGGLE ── */
  const toggleItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setList(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  const selectAll = (
    data: string[],
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList(list.length === data.length ? [] : data);
  };

  /* ── VALIDATION & SUBMIT ── */
  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a Username.');
      return;
    }
    if (!role.trim()) {
      Alert.alert('Required', 'Please enter a Role.');
      return;
    }
    if (mode === 'group' && !selectedGroup) {
      Alert.alert('Required', 'Please select a Permission Group.');
      return;
    }
    if (mode === 'manual') {
      if (selectedDepartments.length === 0) {
        Alert.alert('Required', 'Please select at least one Allowed Department.');
        return;
      }
      if (selectedPermissions.length === 0) {
        Alert.alert('Required', 'Please select at least one Access Permission.');
        return;
      }
    }

    const data: CreateStaffData = {
      name,
      role,
      departments: selectedDepartments,
      permissions: selectedPermissions,
      group: selectedGroup,
    };

    if (editMode && onEdit) {
      onEdit(data);
    } else {
      onCreate(data);
    }

    resetForm();
    onClose();
  };

  /* ── CHECKBOX ── */
  const renderCheckbox = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const selected = list.includes(item);
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => toggleItem(item, list, setList)}
      >
        <View style={[styles.checkbox, selected && styles.checkboxActive]}>
          {selected && <Text style={styles.tick}>✓</Text>}
        </View>
        <Text style={styles.rowText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* ── HEADER ── */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>
              {editMode ? 'Edit Staff Account' : 'Create New Staff Account'}
            </Text>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.closeBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Username *"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Role *"
            style={styles.input}
            value={role}
            onChangeText={setRole}
          />

          {/* ── TABS ── */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, mode === 'group' && styles.activeTab]}
              onPress={() => setMode('group')}
            >
              <Text style={[styles.tabText, mode === 'group' && styles.activeTabText]}>
                Select Group
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, mode === 'manual' && styles.activeTab]}
              onPress={() => setMode('manual')}
            >
              <Text style={[styles.tabText, mode === 'manual' && styles.activeTabText]}>
                Manual Rights
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── GROUP MODE ── */}
          {mode === 'group' && (
            <>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text>{selectedGroup || 'Select Permission Group *'}</Text>
              </TouchableOpacity>
              {showDropdown && (
                <View style={styles.dropdownList}>
                  {GROUPS.map(g => (
                    <TouchableOpacity
                      key={g}
                      style={styles.row}
                      onPress={() => {
                        setSelectedGroup(g);
                        setShowDropdown(false);
                      }}
                    >
                      <Text>{g}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}

          {/* ── MANUAL MODE ── */}
          {mode === 'manual' && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Allowed Departments *</Text>
                <TouchableOpacity
                  onPress={() => selectAll(DEPARTMENTS, selectedDepartments, setSelectedDepartments)}
                >
                  <Text style={styles.selectAll}>Select All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={DEPARTMENTS}
                keyExtractor={item => item}
                style={styles.list}
                renderItem={({ item }) =>
                  renderCheckbox(item, selectedDepartments, setSelectedDepartments)
                }
              />

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Access Permissions *</Text>
                <TouchableOpacity
                  onPress={() => selectAll(PERMISSIONS, selectedPermissions, setSelectedPermissions)}
                >
                  <Text style={styles.selectAll}>Select All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={PERMISSIONS}
                keyExtractor={item => item}
                style={styles.list}
                renderItem={({ item }) =>
                  renderCheckbox(item, selectedPermissions, setSelectedPermissions)
                }
              />
            </>
          )}

          <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
            <Text style={styles.createText}>
              {editMode ? 'Save Changes' : 'Create Staff'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default CreateStaffModal;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '92%',
    maxHeight: '90%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  closeBtn: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textPrimary,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 8,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  selectAll: {
    color: colors.primary,
  },
  list: {
    maxHeight: 120,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
  },
  tick: {
    color: '#fff',
    fontSize: 12,
  },
  rowText: {
    fontSize: 14,
  },
  createBtn: {
    marginTop: 12,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createText: {
    color: '#fff',
    fontWeight: '600',
  },
});