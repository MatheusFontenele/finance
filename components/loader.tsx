import { Loader2 } from 'lucide-react';

interface ILoaderProps {
}

const Loader: React.FunctionComponent<ILoaderProps> = (props) => {
  return <Loader2 className="animate-spin text-muted-foreground" size="32" />;
};

export default Loader;
