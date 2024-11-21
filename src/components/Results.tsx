import { useAppSelector } from '../hooks/useAppSelector';
import { humanSeconds, roundTo } from '../lib/utils';
import styles from './Results.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};
const itemVariants = {
  hidden: { x: '-10%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const Results = () => {
  const targetTime = useAppSelector((state) => state.game.targetTime);
  const startTime = useAppSelector((state) => state.game.startTime);
  const stopTime = useAppSelector((state) => state.game.stopTime);

  const elapsedTime =
    stopTime && startTime ? (stopTime - startTime) / 1000 : null;
  const difference = elapsedTime ? roundTo(targetTime - elapsedTime, 4) : null;

  if (!elapsedTime) return null;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={clsx(
        'text-primary flex flex-col justify-center gap-6 mt-10',
        styles.resultsCnt
      )}
    >
      <motion.p variants={itemVariants} className={styles.resultLine}>
        Target time: {humanSeconds(targetTime)}
      </motion.p>
      <motion.p variants={itemVariants} className={styles.resultLine}>
        Your time: {humanSeconds(elapsedTime, true)}
      </motion.p>
      {difference && (
        <motion.p variants={itemVariants} className={styles.resultLine}>
          Difference: {humanSeconds(difference, true)}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Results;
