import { FC, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface RecoveryPhraseInputProps {
  recoveryPhrase: string[];
  invalidWords: number[];
  use24Words: boolean;
  isImportDisabled: boolean;
  handleSwitchChange: (checked: boolean) => void;
  handleInputChange: (index: number, value: string) => void;
  handlePaste: (index: number, pastedText: string) => void;
  handleImport: () => void;
  makeGoodInputMessage: () => string;
}

const RecoveryPhraseInput: FC<RecoveryPhraseInputProps> = ({
  recoveryPhrase,
  invalidWords,
  use24Words,
  isImportDisabled,
  handleSwitchChange,
  handleInputChange,
  handlePaste,
  handleImport,
  makeGoodInputMessage,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <>
      <p className="text-center text-sm text-gray-400 mb-6">Enter or paste your 12 or 24-word phrase.</p>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <span className="text-sm text-gray-400">Use 24 words</span>
        <Switch checked={use24Words} onCheckedChange={handleSwitchChange} />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {recoveryPhrase.map((word, index) => (
          <Input
            key={index}
            type="text"
            placeholder={`${index + 1}`}
            value={word}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onPaste={(e) => {
              e.preventDefault();
              const pastedText = e.clipboardData.getData('text');
              handlePaste(index, pastedText);
            }}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`bg-gray-800 border-gray-700 text-white ${invalidWords.includes(index) ? 'border-red-500' : ''}`}
          />
        ))}
      </div>
      {invalidWords.length > 0 && <p className="text-red-500 text-sm mb-2">{makeGoodInputMessage()}</p>}
      <Button
        onClick={handleImport}
        disabled={isImportDisabled}
        className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Import
      </Button>
    </>
  );
};

export default RecoveryPhraseInput;
