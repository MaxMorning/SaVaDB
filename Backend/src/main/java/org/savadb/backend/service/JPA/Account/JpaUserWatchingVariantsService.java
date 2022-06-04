package org.savadb.backend.service.JPA.Account;

import org.savadb.backend.entity.UserWatchingEntity;
import org.savadb.backend.repo.Account.JpaUserWatchingVariantsRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class JpaUserWatchingVariantsService {
    @Resource
    private JpaUserWatchingVariantsRepo jpaUserWatchingVariantsRepo;

    public List<String> getAllWatchingVariants(Integer usrId) {
        List<UserWatchingEntity> userWatchingEntityList = jpaUserWatchingVariantsRepo.findAllByUsrId(usrId);

        List<String> resultList = new ArrayList<>();

        for (UserWatchingEntity userWatchingEntity : userWatchingEntityList) {
            resultList.add(userWatchingEntity.getVariantByWatchingVId().getPangoNomenclatureByVId().getVariant());
        }

        return resultList;
    }

    public UserWatchingEntity getUserWatchingEntity(Integer usrId, Integer variantId) {
        return jpaUserWatchingVariantsRepo.checkSubscribe(usrId, variantId);
    }

    public boolean checkSubscribeVariant(Integer usrId, Integer variantId) {
        UserWatchingEntity userWatching = getUserWatchingEntity(usrId, variantId);

        return userWatching != null;
    }

    public void saveWatchingEntity(UserWatchingEntity userWatching) {
        jpaUserWatchingVariantsRepo.save(userWatching);
    }

    public void deleteEntity(UserWatchingEntity userWatching) {
        jpaUserWatchingVariantsRepo.delete(userWatching);
    }
}
