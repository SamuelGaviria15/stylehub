import { useTheme } from '../../hooks/useTheme';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      <div className={`${styles.icon} ${theme === 'dark' ? styles.dark : styles.light}`}>
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </div>
      <span className={styles.label}>
        {theme === 'dark' ? 'Claro' : 'Oscuro'}
      </span>
    </button>
  );
};
