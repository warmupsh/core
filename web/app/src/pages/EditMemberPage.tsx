import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom';
import ViewPage from '@/components/ViewPage'; // Importar ViewPage
import { getMemberById, updateMember } from '../data/members';
import { Input } from '@/components/ui/input'; // Importar el componente Input de shadcn
import { Button } from '@/components/ui/button'; // Importar el componente Button de shadcn
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'; // Importar componentes de Form de shadcn
import { getFavorites, toggleFavorite } from '@/utils/favorites'; // Importar funciones de favoritos
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const EditMemberPage = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const memberData = getMemberById(id);
    if (memberData) {
      setMember(memberData);
    }
    setFavorites(getFavorites('member'));
  }, [id]);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (member) {
      setMember({ ...member, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (member) {
      updateMember(member);
      // Redirigir o mostrar mensaje de éxito
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const handleToggleFavorite = (memberId: string) => {
    toggleFavorite('member', memberId);
    setFavorites(getFavorites('member'));
  };

  if (!member) return <div>Cargando...</div>;

  console.log(member)

  return (
    <ViewPage itemId={id} collection="member" favorites={favorites} toggleFavorite={handleToggleFavorite}>
      <h1>Editar Miembro</h1>
      <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)} onChange={handleChange}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name   </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} value={member.name}/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </ViewPage>
  );
};

export default EditMemberPage;
