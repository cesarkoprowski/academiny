const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function loginUser(email: string, senha: string) {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function registerUser(data: {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
}) {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function forgotPassword(data: { email: string }) {
  const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function getStudentInfo(token: string) {
  const response = await fetch(`${API_BASE_URL}/aluno/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar informações");
  }

  return response.json();
}

export async function createProject(
  data: {
    nome: string;
    atividadeExtensaoId: number;
    professorAvaliadorId: number;
    resumo: string;
    urlAnexo: string;
    feedbackProfessor?: string;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/projeto`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao criar projeto");
  }

  return response.json();
}

export async function createActivity(
  data: {
    titulo: string;
    descricao: string;
    cargaHoraria: number;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/atividade`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao criar atividade");
  }

  return response.json();
}

export async function transformUserToStudent(
  data: {
    cursoId: number;
    matricula: string;
    email: string;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/professor/aluno`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao transformar usuário em aluno");
  }

  return response.json();
}

export async function transformUserToTeacher(
  data: {
    codigoCps: string;
    email: string;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/coordenador/teacher`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao transformar usuário em professor");
  }

  return response.json();
}

export async function transformTeacherToCoordinator(
  data: {
    cursoId: number;
    professorId: number;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/admin/coordinator`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao transformar professor em coordenador");
  }

  return response.json();
}

export async function createCourse(
  data: {
    nome: string;
    modalidade: string;
    turno: string;
    vagas: number;
    cargaHorarioExtensao: number;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/curso`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao criar curso");
  }

  return response.json();
}

export async function createDiscipline(
  data: {
    nome: string;
    codigo: string;
    cargaHorariaExtensao: number;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/disciplina`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao criar disciplina");
  }

  return response.json();
}

export async function linkDisciplineToCourse(
  data: {
    courseId: number;
    disciplineId: number;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/curso/link-discipline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao vincular disciplina ao curso");
  }

  return response.json();
}

export async function getAllActivities(token: string) {
  const response = await fetch(`${API_BASE_URL}/atividade`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar atividades");
  }

  return response.json();
}

export async function updateUserProfile(
  data: {
    nome: string;
    email: string;
    cpf: string;
  },
  token: string
) {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao atualizar perfil");
  }

  return response.json();
}
