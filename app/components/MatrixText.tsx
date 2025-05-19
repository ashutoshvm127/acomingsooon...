import { DeterministicRandom } from '../utils/deterministicRandom';
import '../styles/animations.css';

export function MatrixText({ index }: { index: number }) {
  const random = new DeterministicRandom(index);
  
  const style = {
    left: `${random.next() * 100}%`,
    top: `${-10 * random.next()}px`,
    animationDuration: `${5 + random.next() * 5}s`,
    animationDelay: `${random.next() * 2}s`
  };

  const binaryString = Array.from(
    { length: 20 },
    () => Math.round(random.next())
  ).join('');

  return (
    <div className="falling-text" style={style}>
      {binaryString}
    </div>
  );
}
