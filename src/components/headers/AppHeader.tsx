import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { colors } from '../../theme';

interface AppHeaderProps {
  logo: ImageSourcePropType;
  title: string;
  subtitle?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ logo, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    padding: 4,
  },
  textContainer: {
    marginLeft: 12,
    flexDirection: 'column',
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
