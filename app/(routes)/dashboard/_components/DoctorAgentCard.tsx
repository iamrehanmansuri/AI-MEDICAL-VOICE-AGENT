"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStartConsultation = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/session-chat', {
        notes: `Consultation with ${doctorAgent.specialist}`,
        selectedDoctor: doctorAgent,
      });
      if (result.data?.sessionId) {
        router.push('/dashboard/medical-agent/' + result.data.sessionId);
      }
    } catch (e) {
      console.error('Failed to start consultation:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full justify-between'>
      <div>
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.specialist}
          width={200}
          height={300}
          className='w-full h-[250px] object-cover rounded-xl'
        />
        <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
        <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
      </div>
      <Button
        className='w-full mt-2 cursor-pointer'
        disabled={loading}
        onClick={handleStartConsultation}
      >
        {loading ? <Loader2 className='animate-spin h-4 w-4 mr-2' /> : null}
        Start Consultation <ArrowRight className='ml-1 h-4 w-4' />
      </Button>
    </div>
  );
}

export default DoctorAgentCard;