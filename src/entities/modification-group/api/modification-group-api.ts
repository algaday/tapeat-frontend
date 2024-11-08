import { baseApi, MODIFICATION_GROUP_TAG } from '@shared/api';

import { Modification } from '../ui/types';
import {
  AddModificationDto,
  DeleteModificationGroupDto,
  ModificationGroup,
  ModificationGroupDto,
  ModificationGroupResponse,
} from './types';

export const modificationGroupApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createModificationGroup: build.mutation<ModificationGroupResponse, ModificationGroupDto>({
      query: (body) => ({
        url: 'modification/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [MODIFICATION_GROUP_TAG],
    }),

    getAllModificationGroups: build.query<ModificationGroup[], void>({
      query: () => `modification/all`,
      providesTags: [MODIFICATION_GROUP_TAG],
    }),

    getModificationGroup: build.query<ModificationGroup, string>({
      query: (id) => `modification/${id}`,
      providesTags: [MODIFICATION_GROUP_TAG],
    }),

    deleteModificationGroup: build.mutation<ModificationGroupResponse, DeleteModificationGroupDto>({
      query: (body) => ({
        url: 'modification/delete',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [MODIFICATION_GROUP_TAG],
    }),

    deleteModification: build.mutation<Modification, DeleteModificationGroupDto>({
      query: (body) => ({
        url: 'modification/delete-modification',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [MODIFICATION_GROUP_TAG],
    }),

    addModification: build.mutation<Modification, AddModificationDto>({
      query: (body) => ({
        url: 'modification/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: [MODIFICATION_GROUP_TAG],
    }),

    updateModificationGroup: build.mutation({
      query: (body) => ({
        url: 'modification/update-modification-group',
        method: 'POST',
        body,
      }),
      invalidatesTags: [MODIFICATION_GROUP_TAG],
    }),
  }),
});

export const {
  useCreateModificationGroupMutation,
  useGetAllModificationGroupsQuery,
  useGetModificationGroupQuery,
  useDeleteModificationGroupMutation,
  useAddModificationMutation,
  useDeleteModificationMutation,
  useUpdateModificationGroupMutation,
} = modificationGroupApi;
